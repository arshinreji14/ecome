
import Image from 'next/image';


interface Product {
  id: number;
  image: string;
  title: string;
}

type CatagoryProps = {
  value: Product;
};

const Catagory: React.FC<CatagoryProps> = ({ value }) => {

  return (
    <div>
     <div className="relative mx-4 mt-4 overflow-hidden shadow-lg bg-clip-border 
  h-16 w-16 sm:h-32 sm:w-32 md:h-44 md:w-44 lg:h-54 lg:w-54 xl:h-64 xl:w-64 rounded-full">
  <Image 
    className="object-cover rounded-full" 
    src={`${value.image}` || ""} 
    alt="" 
    fill
  />
  <div className="absolute inset-0 bg-gray-900 opacity-0 hover:opacity-75 transition duration-300 
    flex justify-center items-center text-white text-sm sm:text-xl rounded-full text-center">
    {value.title}
  </div>
</div>
    </div>
  );
};

export default Catagory;


