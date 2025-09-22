import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Check, X } from "lucide-react";
import { trackJobSiteClick } from "@/lib/analytics";

interface JobSite {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  requiresLogin: boolean;
}

interface JobSiteCardProps {
  jobSite: JobSite;
}

export const JobSiteCard = ({ jobSite }: JobSiteCardProps) => {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-card-hover hover:-translate-y-1 border-border/50 bg-card">
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300 pointer-events-none" />
      
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-card-foreground group-hover:text-primary transition-colors">
              {jobSite.name}
            </CardTitle>
            <Badge 
              variant="secondary" 
              className="mt-2 text-xs font-medium bg-secondary/80 text-secondary-foreground"
            >
              {jobSite.category}
            </Badge>
          </div>
          
          <div className="flex items-center gap-1 text-xs font-medium">
            {jobSite.requiresLogin ? (
              <>
                <Check className="h-3 w-3 text-success" />
                <span className="text-success">Login necessário</span>
              </>
            ) : (
              <>
                <X className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">Sem login</span>
              </>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-4">
          {jobSite.description}
        </CardDescription>
        
        <a 
          href={jobSite.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full"
          onClick={() => trackJobSiteClick(jobSite.name, jobSite.url)}
        >
          <Button 
            className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium flex items-center justify-center gap-2"
          >
            Acessar site
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </CardContent>
    </Card>
  );
};