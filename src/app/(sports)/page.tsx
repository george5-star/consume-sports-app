import Converter from '../../../components/converter';
import Feed from '../../../components/feed';
import Fixtures from '../../../components/fixtures';
import Header from '../../../components/header';
import Leagues from '../../../components/leagues';
import Predictions from '../../../components/predictions';

export default function Page() {
  return (
    <>
      <Header />
      <div className="grid grid-cols-[300px_1fr_350px] min-h-screen">
        {/* Fixed Left Sidebar */}
        <div className="sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
          <Leagues />
        </div>

        {/* Scrollable Main Content */}
        <div className="border-x border-gray-200">
          <div className="overflow-y-auto h-[calc(100vh-60px)]">
            <Feed />
            <Fixtures />
          </div>
        </div>

        {/* Fixed Right Sidebar */}
        <div className="sticky top-[60px] h-[calc(100vh-60px)] overflow-y-auto">
          <div className="space-y-6">
            <Converter />
            <Predictions />
          </div>
        </div>
      </div>
    </>
  );
}
