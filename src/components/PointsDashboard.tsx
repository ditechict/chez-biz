import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, PauseCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export const PointsDashboard = () => {
  const userPoints = 3250; // Mock data
  const pointsToSubscription = 2000; // Solo plan
  const subscriptionProgress = (userPoints / pointsToSubscription) * 100;
  
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

      <Card className="glass border-border/50 p-6">
        <div className="flex items-start gap-3">
          <PauseCircle className="mt-0.5 h-5 w-5 text-muted-foreground" />
          <div><h3 className="font-semibold">Rewards are paused</h3><p className="mt-1 text-sm leading-relaxed text-muted-foreground">Listening, ads, sharing and referral activities do not add points. Your existing balance and transaction history remain unchanged.</p></div>
        </div>
      </Card>
    </div>
  );
};