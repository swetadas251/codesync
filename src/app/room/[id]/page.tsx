import CodeEditor from '@/components/CodeEditor';

interface RoomPageProps {
  params: Promise<{ id: string }>;
}

export default async function RoomPage({ params }: RoomPageProps) {
  const { id } = await params;
  return <CodeEditor roomId={id} />;
}
