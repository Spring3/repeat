import React, { useState } from 'react';
import { useData }  from '../contexts/DataContext';
import { Navbar, Tabs } from '../components/Navbar';
import { WordsTab } from '../components/WordsTab';
import { ExercisesTab } from '../components/ExercisesTab';

const MainView = () => {
  const { data } = useData();
  const [activeTab, setActiveTab] = useState(Tabs.Exercises);

  return (
    <div>
      <Navbar
        onNavigate={tab => setActiveTab(tab)}
        wordsCount={data.length}
      />
      {activeTab === Tabs.Words
        ? (<WordsTab entries={data} />)
        : (<ExercisesTab entries={data} />)
      }
    </div>
  );
}

export {
  MainView
}
