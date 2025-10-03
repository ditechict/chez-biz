import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, TrendingUp, Users, PlayCircle, Eye, Share2, Gift } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const PointsDashboard = () => {
  const userPoints = 3250; // Mock data
  const pointsToSubscription = 2000; // Solo plan
  const subscriptionProgress = (userPoints / pointsToSubscription) * 100;
  
  const dailyEarnings = [
    { icon: PlayCircle, label: "Listening", earned: 15, max: 50, description: "1pt per track (≥60s)" },
    { icon: Eye, label: "Ads Watched", earned: 20, max: 100, description: "20pts per ad" },
    { icon: Share2, label: "Sharing", earned: 0, max: 10, description: "10pts per share" },
    { icon: Gift, label: "Referrals", earned: 100, max: 500, description: "100pts per active referral" },
  ];

  return (
    <div className="space-y-6">
      {/* Points Balance */}
      <Card className="glass border-primary/20 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-2">Total Balance</p>
            <div className="flex items-baseline gap-2">
              <h2 className="text-5xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                {userPoints.toLocaleString()}
              </h2>
              <Coins className="w-8 h-8 text-accent" />
            </div>
            <p className="text-muted-foreground mt-2">
              ≈ ${(userPoints / 1000).toFixed(2)} USD
            </p>
          </div>
          
          <div className="flex gap-2">
            <Button variant="gradient" size="sm">
              Redeem
            </Button>
            <Button variant="outline" size="sm">
              History
            </Button>
          </div>
        </div>

        {/* Subscription Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Solo Subscription Coverage</span>
            <span className="font-semibold text-primary">{Math.min(subscriptionProgress, 100).toFixed(0)}%</span>
          </div>
          <Progress value={Math.min(subscriptionProgress, 100)} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {userPoints >= pointsToSubscription 
              ? "Subscription covered! Extra points available for withdrawal." 
              : `${pointsToSubscription - userPoints} points needed for next month`}
          </p>
        </div>
      </Card>

      {/* Daily Earnings */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-bold">Today's Earnings</h3>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2">
          {dailyEarnings.map((item, index) => {
            const Icon = item.icon;
            const progress = (item.earned / item.max) * 100;
            
            return (
              <Card key={index} className="glass border-border/50 p-4 hover:border-primary/30 transition-smooth">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-accent">+{item.earned}</p>
                    <p className="text-xs text-muted-foreground">/ {item.max}</p>
                  </div>
                </div>
                
                <Progress value={progress} className="h-1.5" />
              </Card>
            );
          })}
        </div>
      </div>

      {/* Daily Limit Warning */}
      <Card className="glass border-accent/20 p-4 bg-accent/5">
        <p className="text-sm text-center">
          <span className="font-semibold text-accent">Daily Limit:</span> Maximum 50 points per day from all activities
        </p>
      </Card>
    </div>
  );
};