import React from 'react';
import Artwork from './Artwork';
import { useArtistPhoto } from '../hooks/useArtistPhoto';

export default function ArtistAvatar({ name, style, imageStyle }) {
  const photo = useArtistPhoto(name);
  return (
    <Artwork
      uri={photo?.url}
      name={name}
      type="artist"
      style={style}
      imageStyle={imageStyle}
      accessibilityLabel={`Imagem de ${name}`}
    />
  );
}
