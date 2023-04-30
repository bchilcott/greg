import Nav from '~/components/common/Nav';
import SidePanel from '~/components/common/SidePanel';

export default function Dashboard() {
  return (
    <div className="h-screen">
      <Nav />
      <div className="flex h-full w-full">
        <SidePanel />
        <main className="bg-dashboard-body flex-1" />
      </div>
    </div>
  );
}
