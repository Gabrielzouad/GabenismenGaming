import { Card, CardContent, CardHeader } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export function PlayerStatsSkeleton() {
  return (
    <Card className='bg-[#242b3d] border-none text-white'>
      <CardHeader>
        <div className='flex items-center gap-4'>
          <div className='w-16 h-16 rounded-full bg-gray-700 animate-pulse' />
          <div className='space-y-2'>
            <div className='h-5 w-32 bg-gray-700 rounded animate-pulse' />
            <div className='h-4 w-24 bg-gray-700 rounded animate-pulse' />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue='overview' className='w-full'>
          <TabsList className='grid w-full grid-cols-2 gap-1 bg-[#1c253f]'>
            <TabsTrigger
              value='overview'
              className='bg-[#242b3d] text-white border border-gray-600'
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value='champions'
              className='bg-[#242b3d] text-white border border-gray-600'
            >
              Champions
            </TabsTrigger>
          </TabsList>
          <TabsContent value='overview' className='p-4'>
            <div className='grid grid-cols-2 gap-4'>
              {[...Array(4)].map((_, index) => (
                <div key={index}>
                  <div className='h-4 w-20 bg-gray-700 rounded animate-pulse mb-2' />
                  <div className='h-5 w-16 bg-gray-700 rounded animate-pulse' />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value='champions' className='p-4'>
            <div className='space-y-4'>
              {[...Array(3)].map((_, index) => (
                <div key={index} className='flex items-center gap-4'>
                  <div className='w-10 h-10 rounded-full bg-gray-700 animate-pulse' />
                  <div className='flex-1 space-y-2'>
                    <div className='h-4 w-24 bg-gray-700 rounded animate-pulse' />
                    <div className='h-3 w-32 bg-gray-700 rounded animate-pulse' />
                  </div>
                  <div className='h-4 w-16 bg-gray-700 rounded animate-pulse' />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
