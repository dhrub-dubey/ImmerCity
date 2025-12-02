const categoryPhotos: { [key: string]: string[] } = {
  historic: [
    'https://images.pexels.com/photos/3938018/pexels-photo-3938018.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2041340/pexels-photo-2041340.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  museum: [
    'https://images.pexels.com/photos/1024967/pexels-photo-1024967.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  library: [
    'https://images.pexels.com/photos/3962286/pexels-photo-3962286.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  park: [
    'https://images.pexels.com/photos/1166209/pexels-photo-1166209.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2388220/pexels-photo-2388220.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
  cafe: [
    'https://images.pexels.com/photos/3407857/pexels-photo-3407857.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2398220/pexels-photo-2398220.jpeg?auto=compress&cs=tinysrgb&w=600',
  ],
};

export const getPhotoForPlace = (type: string, placeName: string): string => {
  const typePhotos = categoryPhotos[type] || categoryPhotos.historic;
  const hash = placeName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const index = hash % typePhotos.length;
  return typePhotos[index];
};
