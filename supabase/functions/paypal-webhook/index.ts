import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

    const body = await req.json();
    console.log("PayPal webhook received:", JSON.stringify(body, null, 2));

    const eventType = body.event_type;
    const resource = body.resource;

    // Handle different PayPal events
    switch (eventType) {
      case "BILLING.SUBSCRIPTION.ACTIVATED":
      case "BILLING.SUBSCRIPTION.CREATED": {
        const subscriptionId = resource.id;
        const payerId = resource.subscriber?.payer_id;
        const email = resource.subscriber?.email_address;
        const planId = resource.plan_id;

        console.log(`Subscription activated: ${subscriptionId} for ${email}`);

        if (email) {
          // Find user by email and update subscription
          const { data: authUser } = await supabase.auth.admin.listUsers();
          const user = authUser?.users?.find(u => u.email === email);

          if (user) {
            const { error } = await supabase
              .from("profiles")
              .update({
                subscription_status: "active",
                subscription_plan: planId === "MQGLAZJRTXQ6Y" ? "pro" : "team",
                paypal_subscription_id: subscriptionId,
              })
              .eq("id", user.id);

            if (error) {
              console.error("Failed to update subscription:", error);
            } else {
              console.log(`Updated subscription for user ${user.id}`);
            }
          }
        }
        break;
      }

      case "BILLING.SUBSCRIPTION.CANCELLED":
      case "BILLING.SUBSCRIPTION.EXPIRED":
      case "BILLING.SUBSCRIPTION.SUSPENDED": {
        const subscriptionId = resource.id;
        console.log(`Subscription ended: ${subscriptionId}`);

        const { error } = await supabase
          .from("profiles")
          .update({
            subscription_status: "inactive",
            subscription_plan: null,
          })
          .eq("paypal_subscription_id", subscriptionId);

        if (error) {
          console.error("Failed to update subscription:", error);
        }
        break;
      }

      case "PAYMENT.SALE.COMPLETED": {
        console.log("Payment completed:", resource.id);
        // One-time payment handling if needed
        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (error: unknown) {
    console.error("Webhook error:", error);
    const message = error instanceof Error ? error.message : "Webhook failed";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
