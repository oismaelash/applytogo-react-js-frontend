import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { trackNewsletterSignup } from "@/lib/analytics";

export const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Track newsletter signup
      trackNewsletterSignup(email);
      
      toast({
        title: "Inscrição realizada!",
        description: "Você receberá novidades sobre novos sites de vagas.",
      });
      setEmail("");
    }
  };

  return (
    <Card className="bg-gradient-primary border-0 text-primary-foreground max-w-2xl mx-auto">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Mail className="h-6 w-6" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-2">
          Quer receber novidades de novos sites de vagas?
        </h3>
        <p className="text-primary-foreground/80 mb-6">
          Assine nossa newsletter e seja o primeiro a saber sobre novos sites e oportunidades.
        </p>
        
        <form onSubmit={handleSubmit} className="flex gap-3 max-w-md mx-auto">
          <Input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white/10 border-white/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-white/40"
          />
          <Button 
            type="submit" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 font-medium px-6"
          >
            Assinar
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};