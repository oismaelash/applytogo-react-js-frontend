import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, ArrowRight } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

export const PullRequest = () => {
  const repoUrl = "https://github.com/oismaelash/applytogo-react-js-frontend";

  return (
    <Card className="bg-gradient-primary border-0 text-primary-foreground max-w-2xl mx-auto" data-section="contribute-card">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-white/20 rounded-full">
            <Github className="h-6 w-6" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-2">
          Sentiu falta de alguma plataforma?
        </h3>
        <p className="text-primary-foreground/80 mb-6">
          Este projeto é <span className="font-semibold">open source</span>. Se quiser ver uma plataforma aqui,
          contribua abrindo um <span className="font-semibold">Pull Request</span> no repositório.
        </p>
        
        <div className="flex justify-center" data-section="contribute-cta">
          <Button
            asChild
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 font-medium px-6"
            data-track="click|button|open_pr"
          >
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('click', 'contribution', 'open_pull_request', undefined)}
            >
              Abrir Pull Request
              <ArrowRight className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};