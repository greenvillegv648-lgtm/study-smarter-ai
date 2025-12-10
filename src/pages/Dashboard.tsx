import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useStudyMaterials } from "@/hooks/useStudyMaterials";
import { useEffect, useState } from "react";
import { 
  Upload, 
  Brain, 
  Layers, 
  Target, 
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  Plus,
  FileUp,
  AlertCircle
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { profile, freeCredits, isSubscribed } = useAuth();
  const { materials, fetchMaterials } = useStudyMaterials();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMaterials().finally(() => setIsLoading(false));
  }, []);

  const stats = [
    { label: "Quizzes Available", value: materials.filter(m => m.quizzes?.length).length.toString(), change: "+0%", icon: Brain, color: "primary" },
    { label: "Flashcard Sets", value: materials.filter(m => m.flashcards?.length).length.toString(), change: "+0%", icon: Layers, color: "accent" },
    { label: "Materials Uploaded", value: materials.length.toString(), change: "+0%", icon: Clock, color: "success" },
    { label: "Free Credits", value: isSubscribed ? "∞" : freeCredits.toString(), change: isSubscribed ? "Pro" : "", icon: TrendingUp, color: "warning" },
  ];

  const quickActions = [
    { icon: Upload, label: "Upload Notes", description: "Add new study material", path: "/upload", color: "primary" },
    { icon: Brain, label: "Take a Quiz", description: "Test your knowledge", path: "/quizzes", color: "accent" },
    { icon: Layers, label: "Study Flashcards", description: "Review key concepts", path: "/flashcards", color: "success" },
    { icon: Target, label: "View Predictions", description: "See likely test topics", path: "/predictions", color: "warning" },
  ];

  const handleStudy = (material: typeof materials[0]) => {
    if (material.quizzes?.length) {
      navigate(`/quizzes/${material.id}`);
    } else if (material.flashcards?.length) {
      navigate(`/flashcards/${material.id}`);
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
              Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}! 👋
            </h1>
            <p className="text-muted-foreground">
              Ready to boost your study game? Let's get started.
            </p>
          </div>
          <Link to="/upload">
            <Button variant="hero" className="gap-2">
              <Plus className="w-4 h-4" />
              Upload New Material
            </Button>
          </Link>
        </div>

        {/* Free Trial Banner */}
        {!isSubscribed && (
          <div className="mb-6 p-4 rounded-xl bg-warning-light border border-warning/30 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h4 className="font-medium text-foreground mb-1">
                {freeCredits > 0 
                  ? `${freeCredits} free generation${freeCredits > 1 ? 's' : ''} remaining`
                  : "Free trial used"
                }
              </h4>
              <p className="text-sm text-muted-foreground">
                {freeCredits > 0 
                  ? "Upload a document to generate AI-powered study materials."
                  : "Subscribe to continue generating unlimited study materials."
                }
              </p>
            </div>
            {freeCredits === 0 && (
              <Link to="/billing">
                <Button variant="hero" size="sm">Subscribe</Button>
              </Link>
            )}
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="p-4 lg:p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 text-${stat.color}`} />
                </div>
                {stat.change && (
                  <span className="text-xs font-medium text-success bg-success-light px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.path}>
                <div className="p-4 lg:p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group cursor-pointer h-full">
                  <div className={`w-12 h-12 rounded-xl bg-${action.color}/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className={`w-6 h-6 text-${action.color}`} />
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{action.label}</h3>
                  <p className="text-sm text-muted-foreground">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Materials */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Materials</h2>
            <Link to="/upload" className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            {isLoading ? (
              <div className="p-8 text-center text-muted-foreground">
                Loading...
              </div>
            ) : materials.length === 0 ? (
              <div className="p-8 text-center">
                <FileUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                <h3 className="font-medium text-foreground mb-1">No materials yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Upload your first study material to get started</p>
                <Link to="/upload">
                  <Button variant="hero">Upload Now</Button>
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-border">
                {materials.slice(0, 3).map((material) => (
                  <div key={material.id} className="p-4 lg:p-5 hover:bg-muted/50 transition-colors flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-primary-light flex items-center justify-center">
                        <FileUp className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{material.file_name}</h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{material.file_type.split('/')[1]?.toUpperCase() || 'File'}</span>
                          <span>•</span>
                          <span>{material.quizzes?.length || 0} quizzes</span>
                          <span>•</span>
                          <span>{material.flashcards?.length || 0} flashcards</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground hidden lg:block">
                        {new Date(material.created_at).toLocaleDateString()}
                      </span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStudy(material)}
                        disabled={!material.quizzes?.length && !material.flashcards?.length}
                      >
                        Study
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Upgrade Banner */}
        {!isSubscribed && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-primary to-primary/80 text-primary-foreground relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-1">Unlock All Features</h3>
                  <p className="text-primary-foreground/80">Get unlimited quizzes, flashcards, and AI predictions.</p>
                </div>
              </div>
              <Link to="/billing">
                <Button className="bg-white text-primary hover:bg-white/90 shadow-lg">
                  Upgrade to Pro
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
