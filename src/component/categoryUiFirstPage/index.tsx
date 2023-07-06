import Image from "next/image";
import { useState, useEffect } from 'react';
import { getCategory } from '@/lib/services/axios';
import { useRouter } from 'next/router';

const image = [
  {
    url: '/category/beans-min.png',
    name: 'حبوبات',
    id: "1"
  },
  {
    url: '/category/coffee-min.png',
    name:'قهوه',
    id: "2"
  },
  {
    url: '/category/confectionary-min.png',
    name: 'لوازم قنادی',
    id: "3"
  },
  {
    url: '/category/medicinal-plants.png',
    name: 'گیاهان دارویی',
    id: "4"
  },
  {
    url: '/category/nuts-min.png',
    name: 'خشکبار',
    id: "5"
  },
  {
    url: '/category/seeds-min.png',
    name: 'بذریجات',
    id: "6"
  }
];

export default function MiniCategory() {
  const [category, setCategory] = useState([]);
  const [Url, setUrl] = useState();
  const router = useRouter();

  useEffect(() => {
    getCategory().then(res => setCategory(res.data.data.categories))
  }, []);

  const handleClick = (name) => {
    const item = category.find((item) => item.name === name);
    if (item) {
      setUrl(item);
      // console.log(item);
    }
  };
      // console.log(Url);


  useEffect(() => {
    if (Url && Url.slugname) {
      router.push(`/categories/${Url.slugname}`);
      // setUrl(undefined); // reset Url after routing
    }
  }, [Url, router]);

  return (
    <div className="grid grid-cols-3 justify-items-center">
      {image.map(item => (
        <div key={item.id} className="relative my-5 ">
          <Image src={item.url} width={550} height={300} alt="category" />
          <p className="bg-[rgb(42,20,83)] text-white w-max p-3 px-7 rounded-full absolute bottom-10 left-5 cursor-pointer" onClick={() => handleClick(item.name)}>{item.name}</p>
        </div>
      ))}
    </div>
  )
}