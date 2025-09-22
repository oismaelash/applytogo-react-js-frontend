export interface JobSite {
  id: string;
  name: string;
  category: string;
  description: string;
  url: string;
  requiresLogin: boolean;
}

export interface JobSitesResponse {
  jobSites: JobSite[];
}

// Function to fetch job sites from the public JSON endpoint
export const fetchJobSites = async (): Promise<JobSite[]> => {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: JobSitesResponse = await response.json();
    return data.jobSites;
  } catch (error) {
    console.error('Error fetching job sites:', error);
    // Return empty array as fallback
    return [];
  }
};

// Keep the old export for backward compatibility during transition
// This will be removed once all components are updated to use fetchJobSites
export const jobSites: JobSite[] = [];