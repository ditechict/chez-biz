import { Card } from "@/components/ui/card";
import { Users, Gift, CheckCircle, Clock, PauseCircle } from "lucide-react";

const mockReferrals = [
  { name: "Alex M.", status: "active", daysActive: 15, pointsEarned: 100 },
  { name: "Jordan K.", status: "pending", daysActive: 3, pointsEarned: 0 },
  { name: "Sam R.", status: "active", daysActive: 22, pointsEarned: 100 },
];

export const ReferralSystem = () => {
  const activeReferrals = mockReferrals.filter(r => r.status === "active").length;
  const pendingReferrals = mockReferrals.filter(r => r.status === "pending").length;
  const totalEarned = mockReferrals.reduce((acc, r) => acc + r.pointsEarned, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Users className="w-8 h-8 text-primary" />
          <h2 className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">
             Referrals
          </h2>
        </div>
        <p className="text-muted-foreground">
           Referral rewards are currently paused
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{activeReferrals}</p>
              <p className="text-sm text-muted-foreground">Active Referrals</p>
            </div>
          </div>
        </Card>

        <Card className="glass border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-secondary flex items-center justify-center">
              <Clock className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold text-accent">{pendingReferrals}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </div>
        </Card>

        <Card className="glass border-border/50 p-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-gradient-accent flex items-center justify-center">
              <Gift className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <p className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                {totalEarned}
              </p>
              <p className="text-sm text-muted-foreground">Points Earned</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="glass border-border/50 p-6">
        <div className="flex items-start gap-3 mb-4">
          <PauseCircle className="w-5 h-5 text-muted-foreground mt-1" />
          <div>
            <h3 className="font-bold mb-2">New earning is unavailable</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">Existing referral records and previously earned points are preserved. New invitations cannot generate points while rewards are paused.</p>
          </div>
        </div>
      </Card>

      {/* Referral List */}
      <Card className="glass border-border/50 p-6">
        <h3 className="font-bold mb-4">Your Referrals</h3>
        <div className="space-y-3">
          {mockReferrals.map((referral, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-smooth"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center text-sm font-bold">
                  {referral.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-semibold">{referral.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {referral.daysActive} days active
                  </p>
                </div>
              </div>
              <div className="text-right">
                {referral.status === "active" ? (
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-primary">+{referral.pointsEarned} pts</span>
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{7 - referral.daysActive} days left</span>
                    <Clock className="w-5 h-5 text-muted-foreground" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};