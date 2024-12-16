import PageLayout from '@/components/VideoPage/PageLayout'

import React from 'react'

export default async function VideoPage({ params,}: {params: Promise<{ id: string }>;}) {
  
  return (
    <>
      <PageLayout params={params}/>
    </>
  );
}
