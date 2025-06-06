import { useAppContext } from '@/context/AppContext';

const SocialProof = () => {
  const { contractor } = useAppContext();
  const socialProof: string[] = contractor.social_proof;

  if (!socialProof || socialProof.length === 0) {
    return null;
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-100 shadow-lg rounded-lg py-6 max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6">
          {socialProof.map((proof: string, index: number) => (
            <div 
              key={index}
              className="w-[calc(35%-1rem)] md:w-[calc(13%-1.5rem)]  aspect-square p-2"
            >
              <img
                src={proof}
                alt={`Social proof ${index + 1}`}
                className="w-full h-full object-contain rounded-lg"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}

export default SocialProof
