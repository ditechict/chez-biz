import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Users, Heart, Crown, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Solo",
    icon: Heart,
    price: 2,
    points: 2000,
    users: 1,
    features: [
      "Unlimited streaming",
      "Earn points system",
      "Ad-supported rewards",
      "Offline mode",
      "High quality audio"
    ],
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Couple",
    icon: Users,
    price: 3,
    points: 3000,
    users: 2,
    features: [
      "All Solo features",
      "2 Premium accounts",
      "Shared playlists",
      "Duo listening mode",
      "Priority support"
    ],
    gradient: "from-pink-500 to-rose-500",
    popular: true
  },
  {
    name: "Family",
    icon: Crown,
    price: 6,
    points: 6000,
    users: 5,
    features: [
      "All Couple features",
      "5 Premium accounts",
      "Family mix playlist",
      "Parental controls",
      "Enhanced rewards"
    ],
    gradient: "from-violet-500 to-purple-500"
  },
  {
    name: "Group",
    icon: Sparkles,
    price: 10,
    points: 10000,
    users: 10,
    features: [
      "All Family features",
      "10 Premium accounts",
      "Group sessions",
      "Collaborative playlists",
      "Maximum rewards"
    ],
    gradient: "from-blue-500 to-violet-500"
  }
];

export const SubscriptionPlans = () => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">
          Choose Your Plan
        </h2>
        <p className="text-muted-foreground">
          Cover your subscription with earned points or upgrade anytime
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {plans.map((plan, index) => {
          const Icon = plan.icon;
          
          return (
            <Card 
              key={index} 
              className={`glass relative overflow-hidden p-6 hover:border-primary/50 transition-smooth ${
                plan.popular ? 'border-primary/30 shadow-glow-primary' : 'border-border/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-accent px-3 py-1 text-xs font-bold rounded-bl-lg">
                  POPULAR
                </div>
              )}

              <div className="space-y-4">
                {/* Icon & Name */}
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${plan.gradient} flex items-center justify-center`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.users} {plan.users === 1 ? 'user' : 'users'}</p>
                  </div>
                </div>

                {/* Pricing */}
                <div className="space-y-1">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent">
                      ${plan.price}
                    </span>
                    <span className="text-sm text-muted-foreground">/month</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    or {plan.points.toLocaleString()} points
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Button 
                  variant={plan.popular ? "gradient" : "outline"} 
                  className="w-full"
                >
                  {plan.popular ? "Get Started" : "Select Plan"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Info Box */}
      <Card className="glass border-primary/20 p-6 text-center">
        <p className="text-sm text-muted-foreground">
          💡 <span className="font-semibold text-foreground">Points Auto-Apply:</span> Your earned points automatically 
          cover subscription fees first. Extra points can be withdrawn after meeting the $10 minimum (10,000 points).
        </p>
      </Card>
    </div>
  );
};