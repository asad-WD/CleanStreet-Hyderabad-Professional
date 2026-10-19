const areas = ['GOR Colony', 'Latifabad Unit No. 1', 'Qasimabad', 'Hirabad', 'Auto Bhan Road', 'Citizen Colony', 'Latifabad Unit No. 7', 'Saddar, Hyderabad'];
const titles = ['Overflowing community bin', 'Illegal dumping near vacant lot', 'Household waste awaiting pickup', 'Construction debris on sidewalk', 'Litter around bus stop', 'Market waste needs collection', 'Plastic waste near park entrance', 'Uncollected bags by the road', 'Damaged public waste container', 'Debris blocking pedestrian path', 'Overflowing bin near shops', 'Litter beside playground', 'Mixed waste on service lane', 'Dumped cartons near market', 'Waste around community center'];
const categories = ['Overflowing garbage bin', 'Illegal dumping', 'Uncollected household waste', 'Construction debris', 'Street litter', 'Commercial waste'];
const statuses = ['Reported', 'Under Review', 'Cleanup Scheduled', 'In Progress', 'Resolved'];
const urgencies = ['Low', 'Medium', 'High'];
export const initialReports = titles.map((title, i) => ({
  id: `CS-${String(1048 + i).padStart(4, '0')}`, title, category: categories[i % categories.length],
  description: ['Waste has accumulated and needs attention from the local cleanup team.', 'Residents have noticed this issue over the past few days. Please review the area and arrange cleanup.', 'The waste is affecting pedestrians and the overall cleanliness of the neighborhood.'][i % 3],
  area: areas[i % areas.length], landmark: ['House No. 12, Block B', 'near the main entrance', 'opposite the local shops', 'beside the public walkway'][i % 4],
  date: new Date(Date.now() - i * 86400000 * 2).toISOString().slice(0, 10), urgency: urgencies[(i + 1) % 3], status: statuses[i % statuses.length],
  image: '', createdAt: Date.now() - i * 86400000 * 2, history: [{status: statuses[i % statuses.length], date: new Date(Date.now() - i * 86400000 * 2).toISOString(), note: 'Sample demonstration activity'}],
  lat: 25.396 + (i % 5) * 0.006, lng: 68.358 + (i % 4) * 0.007
}));
