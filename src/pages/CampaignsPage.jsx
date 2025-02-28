import { useState, useEffect } from "react";
import { getCampaigns, deleteCampaign, patchCampaign } from "../api/campaignApi";
import CampaignForm from "../components/CampaignForm";
import CampaignList from "../components/CampaignList";
import CampaignEditForm from "../components/CampaignEditForm";

const CampaignsPage = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [editingCampaign, setEditingCampaign] = useState(null);

    useEffect(() => {
        fetchCampaigns();
    }, []);

    const fetchCampaigns = async () => {
        const response = await getCampaigns();
        setCampaigns(response.data);
    };

    const handleDelete = async (id) => {
        await deleteCampaign(id);
        fetchCampaigns();
    };

    const handleToggleStatus = async (id) => {
        await patchCampaign(id, { status: !campaigns.find((c) => c.id === id).status });
        fetchCampaigns();
    };

    return (
        <div className="container">
            {}
            <div className="form-container">
                {editingCampaign ? (
                    <CampaignEditForm campaign={editingCampaign} onCancel={() => setEditingCampaign(null)} onCampaignUpdated={fetchCampaigns} />
                ) : (
                    <CampaignForm onCampaignAdded={fetchCampaigns} />
                )}
            </div>

            {}
            <div className="campaigns-container">
                <CampaignList campaigns={campaigns} onDelete={handleDelete} onToggleStatus={handleToggleStatus} onEdit={setEditingCampaign} />
            </div>
        </div>
    );
};

export default CampaignsPage;
