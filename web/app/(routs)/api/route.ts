import { NextResponse } from "next/server";

const categories = [
  { id: 1, image: "https://i.ibb.co/tM14r8GV/Essence-of-Life-Food-CARDAMOM-FOOD-AS-MEDICI.jpg", title: " Whole Spices"  },
  { id: 2, image: "https://i.ibb.co/N6pt9NcD/Get-Cozy-with-Wonderful-Warming-Spices-Fooda.jpg", title: "Ground Spices" },
  { id: 3, image: "https://i.ibb.co/fzr5xs5T/25-Scandinavian-Christmas-Decor-Ideas-This-H.jpg", title: "Spice Blends" },
  { id: 4, image: "https://i.ibb.co/CsYWcgds/Turkish-Bay-Leaves.jpg", title: "Herbs" }
];

export async function GET() {
  return NextResponse.json(categories);
}