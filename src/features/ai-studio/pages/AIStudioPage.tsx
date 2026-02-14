import { useState } from 'react';
import styles from './AIStudioPage.module.scss';
import Banner from '@/components/layout/Banner/Banner';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { AiOutlinePlusCircle } from 'react-icons/ai';

// Types
interface Agent {
  id: string;
  name: string;
  model: string;
  modelId: string;
  image: string;
}

// Mock data
const mockAgents: Agent[] = [
  {
    id: '1',
    name: 'AI Voice Script v1',
    model: 'gpt-4o',
    modelId: 'F6nGhEBLtOt2ONQduTGn',
    image: '/agents/agent-1.jpg',
  },
  {
    id: '2',
    name: 'AI Voice Script v1',
    model: 'gpt-4o',
    modelId: 'F6nGhEBLtOt2ONQduTGn',
    image: '/agents/agent-2.jpg',
  },
  {
    id: '3',
    name: 'AI Voice Script v1',
    model: 'gpt-4o',
    modelId: 'F6nGhEBLtOt2ONQduTGn',
    image: '/agents/agent-3.jpg',
  },
  {
    id: '4',
    name: 'AI Voice Script v1',
    model: 'gpt-4o',
    modelId: 'F6nGhEBLtOt2ONQduTGn',
    image: '/agents/agent-4.jpg',
  },
];

// Placeholder images (abstract AI art gradients)
const placeholderImages = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)',
  'linear-gradient(135deg, #240046 0%, #3c096c 50%, #5a189a 100%)',
  'linear-gradient(135deg, #10002b 0%, #240046 50%, #3c096c 100%)',
];

// Icons
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// const PlusIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
//     <path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
//   </svg>
// );

const ChevronLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M8.5 10L5.5 7L8.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ChevronRightIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M5.5 4L8.5 7L5.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

  function AIStudioPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const totalAgents = 4;
  const totalPages = 3;

  const filteredAgents = mockAgents.filter((agent) =>
    agent.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTest = (agentId: string) => {
    console.log('Test agent:', agentId);
  };

  const handleCreateAgent = () => {
    console.log('Create new agent');
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <Banner>
        <div className={styles.header}>
        <h1 className={styles.title}>AI Agent</h1>

        <div className={styles.actions}>
          {/* Search Input */}
          <div className={styles.searchWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className={styles.searchIcon}>
              <SearchIcon />
            </span>
          </div>

          {/* Create Agent Button */}
          <button className={styles.createButton} onClick={handleCreateAgent}>
            <AiOutlinePlusCircle />
            <span>Create Agent</span>
          </button>
        </div>
      </div>
      </Banner>

      {/* Agent Cards Grid */}
      <div className={styles.grid}>
        {filteredAgents.map((agent, index) => (
          <div key={agent.id} className={styles.card}>
            <div
              className={styles.cardImage}
              style={{ background: placeholderImages[index % placeholderImages.length] }}
            >
              <div className={styles.cardImageOverlay} />
            </div>
            <div className={styles.cardContent}>
              <div className={styles.cardInfo}>
                <h3 className={styles.cardTitle}>{agent.name}</h3>
                <p className={styles.cardMeta}>
                  {agent.model} • {agent.modelId}
                </p>
              </div>
              <button
                className={styles.testButton}
                onClick={() => handleTest(agent.id)}
              > 
                <HiOutlineDotsHorizontal />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className={styles.footer}>
        <div className={styles.totalCount}>
          {totalAgents} Assistants
        </div>

        <div className={styles.pagination}>
          <button
            className={styles.paginationButton}
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            <ChevronLeftIcon />
            <ChevronLeftIcon />
          </button>

          {[1, 2, 3].map((page) => (
            <button
              key={page}
              className={`${styles.paginationNumber} ${currentPage === page ? styles.active : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}

          <button
            className={styles.paginationButton}
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(totalPages)}
          >
            <ChevronRightIcon />
            <ChevronRightIcon />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AIStudioPage