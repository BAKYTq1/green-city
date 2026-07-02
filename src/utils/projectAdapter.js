// Преобразует объект project из API в формат, который ожидают
// компоненты ApartmentsHome / Apartments / ApartCard (как у OBJECTS)

export function mapProjectToObject(project) {
  const photos = [
    ...(project.progress || []).map((p) => p.img),
    ...(project.apartment || []).map((a) => a.image),
  ].filter(Boolean);

  return {
    id: project.id,
    slug: String(project.id),
    name: project.name,
    title: project.title,
    address: project.adres,
    type: project.type?.name || "",
    statusText: project.time?.time || "",
    floors: Number(project.storeys) || 0,
    blocks: Number(project.blocks) || 0,
    apartmentsCount: Number(project.how_many) || 0,
    location: project.location?.location || "",
    photos: photos.length > 0 ? photos : [""],
    badge: project.time?.time || "",
    apartments: project.apartment || [],
    progress: project.progress || [],
    comfortable: project.comfortable || [],
  };
}

export function mapProjectList(projects) {
  return (projects || []).map(mapProjectToObject);
}