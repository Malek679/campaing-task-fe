const CampaignItem = ({ campaign, onDelete, onToggleStatus, onEdit }) => {
    return (
        <li className="p-4 border-b bg-white shadow-md rounded-md">
            <h3 className="text-lg font-semibold">{campaign.campaignName}</h3>
            <p><strong>Bid Amount:</strong> ${campaign.bidAmount}</p>
            <p><strong>Campaign Found:</strong> {campaign.campaignFound}</p>
            <p><strong>Status:</strong> {campaign.status ? "Active" : "Inactive"}</p>
            <p><strong>Radius:</strong> {campaign.radius} km</p>
            <p><strong>Keywords:</strong> {campaign.keywords.map(k => k.keyword).join(", ")}</p>
            <p><strong>Town:</strong> {campaign.town ? `${campaign.town.name} (Population: ${campaign.town.population})` : "No Town Assigned"}</p>

            <div className="mt-3">
                <button className="bg-red-500 text-white px-3 py-1 mr-2 rounded" onClick={() => onDelete(campaign.id)}>Delete</button>
                <button className="bg-green-500 text-white px-3 py-1 mr-2 rounded" onClick={() => onToggleStatus(campaign.id)}>Toggle Status</button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded" onClick={() => onEdit(campaign)}>Edit</button>
            </div>
        </li>
    );
};

export default CampaignItem;
