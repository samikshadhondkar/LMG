import { useEffect, useState } from "react";
import { getDashboardSummary } from "@/services/dashboardService";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import KPISection from "@/components/dashboard/KPISection";
import FleetSummary from "@/components/dashboard/FleetSummary";
import DashboardCharts from "@/components/dashboard/DashboardCharts";
import RecentTrips from "@/components/dashboard/RecentTrips";

const Dashboard = () => {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                setLoading(true);
                setError(null);
                const result = await getDashboardSummary();
                setSummary(result.data);
            } catch (err) {
                setError(
                    err?.response?.data?.message || "Failed to load dashboard summary"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-10">
                <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center py-10">
                <p className="text-sm text-destructive">{error}</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4">
            <DashboardHeader />
            <KPISection summary={summary} />
            <FleetSummary summary={summary} />
            <DashboardCharts summary={summary} />
            {/* TODO: RecentTrips passed [] since Trip fetching belongs to the trips-maintenance module */}
            <RecentTrips trips={[]} />
        </div>
    );
};

export default Dashboard;