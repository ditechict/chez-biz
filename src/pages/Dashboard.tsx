import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MusicPlayer } from "@/components/MusicPlayer";
import { PointsDashboard } from "@/components/PointsDashboard";
import { SubscriptionPlans } from "@/components/SubscriptionPlans";
import { ReferralSystem } from "@/components/ReferralSystem";
import { useAuth } from "@/contexts/AuthContext";
import { useUserPoints } from "@/hooks/useUserPoints";
import { Music, Coins, CreditCard, Users, LogOut, Loader2 } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("player");
  const { user, loading, signOut } = useAuth();
  const { points, loading: pointsLoading } = useUserPoints();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="fixed inset-0 opacity-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border/50 backdrop-blur-xl bg-background/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <Music className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                    BeatRewards
                  </h1>
                  <p className="text-xs text-muted-foreground">Stream & Earn</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20">
                  <Coins className="w-5 h-5 text-accent" />
                  <span className="font-bold">
                    {pointsLoading ? "..." : `${points.toLocaleString()} pts`}
                  </span>
                </div>
                <Button variant="ghost" size="icon" onClick={signOut} title="Sign out">
                  <LogOut className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 glass border border-border/50">
              <TabsTrigger value="player" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                <Music className="w-4 h-4" />
                <span className="hidden sm:inline">Player</span>
              </TabsTrigger>
              <TabsTrigger value="points" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                <Coins className="w-4 h-4" />
                <span className="hidden sm:inline">Points</span>
              </TabsTrigger>
              <TabsTrigger value="plans" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                <CreditCard className="w-4 h-4" />
                <span className="hidden sm:inline">Plans</span>
              </TabsTrigger>
              <TabsTrigger value="referral" className="flex items-center gap-2 data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">Referral</span>
              </TabsTrigger>
            </TabsList>

            <div className="max-w-6xl mx-auto">
              <TabsContent value="player" className="mt-0 space-y-6">
                <div className="text-center space-y-2 mb-8">
                  <h2 className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                    Now Playing
                  </h2>
                  <p className="text-muted-foreground">Earn 1 point per track (minimum 60 seconds)</p>
                </div>
                <MusicPlayer />
              </TabsContent>

              <TabsContent value="points" className="mt-0">
                <PointsDashboard />
              </TabsContent>

              <TabsContent value="plans" className="mt-0">
                <SubscriptionPlans />
              </TabsContent>

              <TabsContent value="referral" className="mt-0">
                <ReferralSystem />
              </TabsContent>
            </div>
          </Tabs>
        </main>

        {/* Footer */}
        <footer className="border-t border-border/50 backdrop-blur-xl bg-background/50 mt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>© 2024 BeatRewards. Stream music, earn rewards, enjoy premium content.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
