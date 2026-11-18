import { useParams } from 'react-router-dom';
import type { PersonCombinedCredits, PersonDetails, PersonImages } from '../api/types.ts';
import { imageUrl } from '../api/tmdb.ts';
import { useTmdb } from '../hooks/useTmdb.ts';
import { useDocumentTitle } from '../hooks/useDocumentTitle.ts';
import BackHome from '../components/BackHome.tsx';
import Biography from '../components/Biography.tsx';
import CreditsList from '../components/CreditsList.tsx';
import Slider from '../components/Slider.tsx';
import StatusMessage from '../components/StatusMessage.tsx';

export default function PersonDetailsPage() {
  const { id } = useParams();
  const { data: person, error } = useTmdb<PersonDetails>(`person/${id}`);
  const images = useTmdb<PersonImages>(`person/${id}/images`);
  const credits = useTmdb<PersonCombinedCredits>(`person/${id}/combined_credits`);
  useDocumentTitle(person?.name);

  if (error) return <StatusMessage title="Person not found" text="This person doesn't exist or could not be loaded." />;

  const photo = imageUrl(person?.profile_path);
  const photos = images.data?.profiles ?? [];
  // Movies and series the person played in, without duplicates of the same title
  const castCredits = credits.data?.cast.filter((credit) => credit.title || credit.name) ?? [];

  return (
    <div className="container">
      <BackHome />
      {person && (
        <section className="section-mb">
          <div className="details-top">
            <div className="details-poster">
              {photo ? (
                <img src={photo} alt={person.name} />
              ) : (
                <div className="no-image-big">
                  <img src="/actor.svg" alt="" />
                </div>
              )}
            </div>
            <div className="details-info">
              <h1 className="details-title-main">{person.name}</h1>
              <ul className="details-facts">
                <li className="details-department">{person.known_for_department}</li>
              </ul>
              <div className="details-overview">
                <h2 className="details-title-secondary">Biography</h2>
                <Biography key={person.id} name={person.name} text={person.biography} />
              </div>
            </div>
          </div>
        </section>
      )}

      {images.data && (
        <section className="section-mb">
          <h2 className="details-title-secondary">Photos</h2>
          {photos.length > 0 ? (
            <Slider
              label="Photos"
              className="photos-content"
              items={photos}
              getKey={(image) => image.file_path}
              renderItem={(image) => (
                <img className="slider-card-image" src={imageUrl(image.file_path) ?? ''} alt={person?.name ?? ''} loading="lazy" />
              )}
            />
          ) : (
            <p>Unfortunately, there are no photos yet.</p>
          )}
        </section>
      )}

      {credits.data && (
        <section className="section-mb">
          <h2 className="details-title-secondary">Credits</h2>
          <CreditsList key={id} credits={castCredits} />
        </section>
      )}
    </div>
  );
}
