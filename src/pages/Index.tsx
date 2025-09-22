import { useState, useMemo, useEffect } from "react";
import { JobSiteCard } from "@/components/JobSiteCard";
import { SearchFilter } from "@/components/SearchFilter";
import { Newsletter } from "@/components/Newsletter";
import { fetchJobSites, JobSite } from "@/data/jobSites";

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [jobSites, setJobSites] = useState<JobSite[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch job sites data on component mount
  useEffect(() => {
    const loadJobSites = async () => {
      try {
        const data = await fetchJobSites();
        setJobSites(data);
      } catch (error) {
        console.error('Failed to load job sites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadJobSites();
  }, []);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(jobSites.map(site => site.category))];
    return uniqueCategories.sort();
  }, [jobSites]);

  const filteredSites = useMemo(() => {
    return jobSites.filter(site => {
      const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          site.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === "all" || site.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory, jobSites]);

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="bg-background/80 backdrop-blur-sm border-b border-border/50">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
              Encontre os melhores sites de vagas
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Descubra uma curadoria dos melhores portais de emprego para encontrar sua próxima oportunidade profissional.
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categories={categories}
        />

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-xl text-muted-foreground mb-4">
              Carregando sites de vagas...
            </p>
          </div>
        ) : (
          <>
            {/* Results Counter */}
            <div className="text-center mb-8">
              <p className="text-muted-foreground">
                {filteredSites.length} {filteredSites.length === 1 ? 'site encontrado' : 'sites encontrados'}
                {selectedCategory !== "all" && ` na categoria "${selectedCategory}"`}
              </p>
            </div>

            {/* Job Sites Grid */}
            {filteredSites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
                {filteredSites.map((site, index) => (
                  <div 
                    key={site.id} 
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <JobSiteCard jobSite={site} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-xl text-muted-foreground mb-4">
                  Nenhum site encontrado para sua busca.
                </p>
                <p className="text-muted-foreground">
                  Tente ajustar os filtros ou termo de busca.
                </p>
              </div>
            )}
          </>
        )}

        {/* Newsletter CTA */}
        <Newsletter />
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border/50 py-8 mt-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 Sites de Vagas. Encontre sua próxima oportunidade.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
