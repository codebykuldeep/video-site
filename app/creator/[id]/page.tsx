import CreatorLayout from "@/components/CreatorPage/CreatorLayout";

export default async function page({ params}: {params: Promise<{ id: string }>;}) {
    const {id} = await params;
    
    return (
      <CreatorLayout userId={id}/>
    )
  }
  