import Bathtub from '@/components/icons/Bathtub';
import Trowel from '@/components/icons/Trowel';
import Closet from '@/components/icons/Closet';
import Plumbing from '@/components/icons/Plumbing';
import Deck from '@/components/icons/Deck';
import Garage from '@/components/icons/Garage';
import Gutter from '@/components/icons/Gutter';
import Foundation from '@/components/icons/Foundation';
import Flooring from '@/components/icons/Floor';
import Kitchen from '@/components/icons/Kitchen';
import Roofing from '@/components/icons/Roofing';
import Siding from '@/components/icons/Siding';
import Shower from '@/components/icons/Shower';
import Windows from '@/components/icons/Windows';
import Fence from '@/components/icons/Fence';
import Doors from '@/components/icons/Doors';
import Solar from '@/components/icons/Solar';
import Insulation from '@/components/icons/Insulation';
import WalkInTub from '@/components/icons/WalkInTub';
import GutterHelmet from '@/components/icons/GutterHelmet';
import Cabinet from '@/components/icons/Cabinet';
import House from '@/components/icons/House';
import SolarWall from '@/components/icons/SolarWall';
import SolarPanel from '@/components/icons/SolarPanel';
import SolarAccessories from '@/components/icons/SolarAccessories';
import Lighting from '@/components/icons/Lighting';
import Callback from '@/components/icons/Callback';

const iconMapping: Record<string, React.ElementType> = {
  Bath: Bathtub,
  "Basement Waterproofing": Trowel,
  Closet: Closet,
  Plumbing: Plumbing,
  Deck: Deck,
  Doors: Doors,
  Fence: Fence,
  Flooring: Flooring,
  Garage: Garage,
  Gutters: Gutter,
  Foundation: Foundation,
  Kitchen: Kitchen,
  Roofing: Roofing,
  Siding: Siding,
  Shower: Shower,
  Windows: Windows,
  Solar: Solar,
  Insulation: Insulation,
  "Walk-in Tub": WalkInTub,
  "Floor Coating": Flooring,
  "Gutter Helmet": GutterHelmet,
  Cabinet: Cabinet,
  Bathtub: WalkInTub,
  House: House,
  'Solar Power Wall': SolarWall,
  'Solar Panel': SolarPanel,
  'Solar Accessories': SolarAccessories,
  'Lighting': Lighting,
  Callback: Callback,
};

export default iconMapping;