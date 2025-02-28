import { useState, useEffect } from "react";
import { updateCampaign, getTowns } from "../api/campaignApi";

const CampaignEditForm = ({ campaign, onCancel, onCampaignUpdated }) => {
    const [campaignName, setCampaignName] = useState(campaign.campaignName);
    const [keywords, setKeywords] = useState(campaign.keywords.map(k => k.keyword));
    const [bidAmount, setBidAmount] = useState(campaign.bidAmount);
    const [campaignFound, setCampaignFound] = useState(campaign.campaignFound);
    const [status, setStatus] = useState(campaign.status);
    const [towns, setTowns] = useState([]);
    const [selectedTown, setSelectedTown] = useState(campaign.town);
    const [radius, setRadius] = useState(campaign.radius);
    const [errors, setErrors] = useState({});
    const [keywordInput, setKeywordInput] = useState("");

    useEffect(() => {
        fetchTowns();
    }, []);

    const fetchTowns = async () => {
        try {
            const response = await getTowns();
            setTowns(response.data);
        } catch (error) {
            console.error("Getting Towns error:", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const updatedCampaign = {
            campaignName,
            keywords: keywords.map((kw) => ({ keyword: kw })),
            bidAmount,
            campaignFound,
            status,
            town: selectedTown ? { id: selectedTown.id, name: selectedTown.name, population: selectedTown.population } : null,
            radius
        };

        try {
            await updateCampaign(campaign.id, updatedCampaign);
            onCampaignUpdated();
            onCancel();
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setErrors(error.response.data);
            } else {
                console.error("Campaign actualization error:", error);
            }
        }
    };

    const addKeyword = () => {
        if (keywordInput.trim()) {
            setKeywords([...keywords, keywordInput]);
            setKeywordInput("");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 border space-y-3 bg-gray-50 shadow-md rounded-md">
            <h2 className="text-xl font-bold">Edit Campaign</h2>

            <div>
                <label className="block font-semibold">Campaign Name:</label>
                <input type="text" className="border p-2 w-full" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} />
                {errors.campaignName && <p className="text-red-500">{errors.campaignName}</p>}
            </div>

            <div>
                <label className="block font-semibold">Keywords:</label>
                <div className="flex space-x-2">
                    <input type="text" className="border p-2" value={keywordInput} onChange={(e) => setKeywordInput(e.target.value)} />
                    <button type="button" className="bg-green-500 text-white px-3 py-1" onClick={addKeyword}>Add</button>
                </div>
                <ul className="text-sm text-gray-700 mt-2">{keywords.map((kw, index) => (<li key={index}>{kw}</li>))}</ul>
            </div>

            <div>
                <label className="block font-semibold">Bid Amount:</label>
                <input type="number" className="border p-2 w-full" value={bidAmount} onChange={(e) => setBidAmount(Number(e.target.value))} />
                {errors.bidAmount && <p className="text-red-500">{errors.bidAmount}</p>}
            </div>

            <div>
                <label className="block font-semibold">Campaign Found:</label>
                <input type="number" className="border p-2 w-full" value={campaignFound} onChange={(e) => setCampaignFound(Number(e.target.value))} />
                {errors.campaignFound && <p className="text-red-500">{errors.campaignFound}</p>}
            </div>

            <div>
                <label className="block font-semibold">Status:</label>
                <label className="flex items-center space-x-2">
                    <input type="checkbox" checked={status} onChange={() => setStatus(!status)} />
                    <span>{status ? "Active" : "Inactive"}</span>
                </label>
            </div>

            <div>
                <label className="block font-semibold">Town:</label>
                <select className="border p-2 w-full" value={selectedTown ? selectedTown.id : ""} onChange={(e) => {
                    const town = towns.find((t) => t.id.toString() === e.target.value);
                    setSelectedTown(town);
                }}>
                    <option value="">Select Town</option>
                    {towns.map((town) => (
                        <option key={town.id} value={town.id}>{town.name} (Population: {town.population})</option>
                    ))}
                </select>
                {errors.town && <p className="text-red-500">{errors.town}</p>}
            </div>

            <div>
                <label className="block font-semibold">Radius:</label>
                <input type="number" className="border p-2 w-full" value={radius} onChange={(e) => setRadius(Number(e.target.value))} />
                {errors.radius && <p className="text-red-500">{errors.radius}</p>}
            </div>

            <button className="bg-blue-500 text-white px-3 py-2 w-full rounded-md" type="submit">Save Changes</button>
            <button type="button" className="bg-gray-500 text-white px-3 py-2 w-full mt-2 rounded-md" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default CampaignEditForm;
