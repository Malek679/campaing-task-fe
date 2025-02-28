import CampaignItem from "./CampaignItem";

const CampaignList = ({ campaigns, onDelete, onToggleStatus, onEdit }) => {
    return (
        <ul>
            {campaigns.map((campaign) => (
                <CampaignItem key={campaign.id} campaign={campaign} onDelete={onDelete} onToggleStatus={onToggleStatus} onEdit={onEdit} />
            ))}
        </ul>
    );
};

export default CampaignList;
