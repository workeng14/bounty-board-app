/** @format */

import {
  AppstoreOutlined,
  DownOutlined,
  SearchOutlined,
  UserOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Input, Select, Space, Tag } from "antd";
import { useState, useEffect, useMemo } from "react";
import EmptyImg from "../../../assets/LandingPage/EmptyImg.svg";
import { ArrowLeft } from "../../../../src copy/assets/LandingPage/HeroSection";
import ArrowButton from "../../../shared/Buttons/ArrowButton";
import CustomPagination from "../../../shared/Buttons/CustomPagination";
import StanderButton from "../../../shared/Buttons/StanderButton";
import CustomDrawer from "../../../shared/CustomDrawer";
import DetailsDrawer from "../HowBountyBoardWork/DetailsDrawer";
import AdvanceFilterDropdown from "./AdvanceFilter";
import BountiesCard from "./BountiesCard";
import { useNavigate } from "react-router";
import Viewa from "./View";
import { bountiesCardData } from "../../../MockData/bountiesCardData";

const { Option } = Select;

const Index = () => {
  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [selectedSalary, setSelectedSalary] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedPostedDate, setSelectedPostedDate] = useState(null);
  
  // Sorting and Pagination States
  const [sortBy, setSortBy] = useState("latest");
  const [perPage, setPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  
  // UI States
  const [open, setOpen] = useState(false);
  const [selectedBounty, setSelectedBounty] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();

  // Helper function to extract salary value
  const extractSalaryValue = (salaryString) => {
    const match = salaryString.match(/\$(\d+)/);
    return match ? parseInt(match[1]) : 0;
  };

  // Helper function to calculate days since posted
  const getDaysSincePosted = (postedDate) => {
    const posted = new Date(postedDate);
    const today = new Date();
    const diffTime = Math.abs(today - posted);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Filter bounties based on all criteria
  const filteredBounties = useMemo(() => {
    let filtered = [...bountiesCardData];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter((bounty) =>
        bounty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bounty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bounty.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter (based on skills)
    if (selectedCategory) {
      const categoryMap = {
        design: ["UI/UX", "Design", "Frontend"],
        dev: ["Developer", "Backend", "Frontend", "Full Stack"],
        marketing: ["Marketing", "Social Media"]
      };
      
      if (categoryMap[selectedCategory]) {
        filtered = filtered.filter((bounty) =>
          bounty.skills.some(skill =>
            categoryMap[selectedCategory].some(cat =>
              skill.toLowerCase().includes(cat.toLowerCase())
            )
          )
        );
      }
    }

    // Language filter
    if (selectedLanguage) {
      filtered = filtered.filter((bounty) =>
        bounty.languages.includes(selectedLanguage)
      );
    }

    // Salary filter
    if (selectedSalary) {
      filtered = filtered.filter((bounty) => {
        const bountyValue = extractSalaryValue(bounty.details.bountyReward);
        
        if (selectedSalary === "$50 - $1000") return bountyValue >= 50 && bountyValue <= 1000;
        if (selectedSalary === "$1000 - $2000") return bountyValue > 1000 && bountyValue <= 2000;
        if (selectedSalary === "$2000 - $4000") return bountyValue > 2000 && bountyValue <= 4000;
        if (selectedSalary === "$4000 - $6000") return bountyValue > 4000 && bountyValue <= 6000;
        if (selectedSalary === "$6000 - $8000") return bountyValue > 6000 && bountyValue <= 8000;
        if (selectedSalary === "$8000 - $10000") return bountyValue > 8000 && bountyValue <= 10000;
        if (selectedSalary === "$10000 - $15000") return bountyValue > 10000 && bountyValue <= 15000;
        if (selectedSalary === "$15000+") return bountyValue > 15000;
        
        return true;
      });
    }

    // Duration filter
    if (selectedDuration && selectedDuration.length > 0) {
      filtered = filtered.filter((bounty) => {
        const days = bounty.daysRemaining;
        
        return selectedDuration.some(duration => {
          if (duration === "all") return true;
          if (duration === "<1") return days < 7;
          if (duration === "1-2") return days >= 7 && days <= 14;
          if (duration === "1month") return days > 14 && days <= 31;
          if (duration === "ongoing") return days > 31;
          return false;
        });
      });
    }

    // Posted Date filter
    if (selectedPostedDate) {
      filtered = filtered.filter((bounty) => {
        const daysSince = getDaysSincePosted(bounty.details.postedDate);
        
        if (selectedPostedDate === "24h") return daysSince <= 1;
        if (selectedPostedDate === "week") return daysSince <= 7;
        if (selectedPostedDate === "month") return daysSince <= 30;
        
        return true;
      });
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedLanguage, selectedSalary, selectedDuration, selectedPostedDate]);

  // Sort bounties
  const sortedBounties = useMemo(() => {
    let sorted = [...filteredBounties];

    switch (sortBy) {
      case "latest":
        sorted.sort((a, b) => 
          new Date(b.details.postedDate) - new Date(a.details.postedDate)
        );
        break;
      case "popular":
        sorted.sort((a, b) => b.contributors.length - a.contributors.length);
        break;
      case "priceLow":
        sorted.sort((a, b) => 
          extractSalaryValue(a.details.bountyReward) - extractSalaryValue(b.details.bountyReward)
        );
        break;
      case "priceHigh":
        sorted.sort((a, b) => 
          extractSalaryValue(b.details.bountyReward) - extractSalaryValue(a.details.bountyReward)
        );
        break;
      default:
        break;
    }

    return sorted;
  }, [filteredBounties, sortBy]);

  // Paginate bounties
  const paginatedBounties = useMemo(() => {
    const startIndex = (currentPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    return sortedBounties.slice(startIndex, endIndex);
  }, [sortedBounties, currentPage, perPage]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedLanguage, selectedSalary, selectedDuration, selectedPostedDate]);

  const handleFilterApply = () => {
    // Trigger re-render with current filters
    setCurrentPage(1);
  };

  const handleClickDetails = () => {
    if (selectedBounty) {
      // Navigate to bounty details page with bounty ID
      navigate(`/details/${selectedBounty.id}`, {
        state: { bountyData: selectedBounty }
      });
    } else {
      navigate("/details");
    }
  };

  const showDrawer = (bounty) => {
    setSelectedBounty(bounty);
    setOpen(true);
  };
  
  const onClose = () => {
    setOpen(false);
    setSelectedBounty(null);
  };

  return (
    <div id='explore-bounties' className='my-5 md:my-10'>
      <div className='max-w-[100rem] w-full px-4 sm:px-6 lg:w-[90%] xl:w-[70%] m-auto py-3 md:py-5'>
        {/* Header */}
        <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold mb-4 md:mb-6'>
          Explore Active Bounties
        </h2>

        {/* Search and Filter Section */}
        <div className='flex flex-col sm:flex-row justify-between border border-gray-100 shadow-sm rounded-lg'>
          <div className='flex flex-col sm:flex-row p-2 sm:p-3 space-y-2 sm:space-y-0 sm:space-x-3 w-full'>
            <div className='flex items-center border-b sm:border-b-0 sm:border-r pr-0 sm:pr-3 w-full'>
              <SearchOutlined className='text-blue-600 mr-2' />
              <Input
                bordered={false}
                placeholder='Bounty title, Keyword...'
                className='w-full placeholder-gray-400'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className='flex items-center border-b sm:border-b-0 sm:border-r pr-0 sm:pr-3'>
              <AppstoreOutlined className='text-blue-600 mr-2' />
              <Select
                bordered={false}
                placeholder='Category'
                className='w-full sm:w-36'
                suffixIcon={<DownOutlined />}
                dropdownMatchSelectWidth={false}
                value={selectedCategory}
                onChange={setSelectedCategory}
                allowClear
              >
                <Option value='design'>Design</Option>
                <Option value='dev'>Development</Option>
                <Option value='marketing'>Marketing</Option>
              </Select>
            </div>

            <div className='sm:hidden w-full'>
              <AdvanceFilterDropdown 
                mobile 
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                selectedSalary={selectedSalary}
                setSelectedSalary={setSelectedSalary}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                selectedPostedDate={selectedPostedDate}
                setSelectedPostedDate={setSelectedPostedDate}
              />
            </div>
            <div className='hidden sm:block'>
              <AdvanceFilterDropdown 
                selectedLanguage={selectedLanguage}
                setSelectedLanguage={setSelectedLanguage}
                selectedSalary={selectedSalary}
                setSelectedSalary={setSelectedSalary}
                selectedDuration={selectedDuration}
                setSelectedDuration={setSelectedDuration}
                selectedPostedDate={selectedPostedDate}
                setSelectedPostedDate={setSelectedPostedDate}
              />
            </div>
          </div>

          <div className='p-2 sm:p-3 flex justify-end sm:justify-start'>
            <StanderButton
              size='large'
              text='Find Bounty'
              className='w-full sm:w-auto'
              onClick={handleFilterApply}
            />
          </div>
        </div>

        {/* Active Filters Display */}
        {(searchTerm || selectedCategory || selectedLanguage || selectedSalary || selectedDuration.length > 0 || selectedPostedDate) && (
          <div className='mt-4 flex flex-wrap gap-2 items-center'>
            <span className='text-gray-600 font-medium'>Active Filters:</span>
            {searchTerm && (
              <Tag
                closable
                onClose={() => setSearchTerm("")}
                color='blue'
              >
                Search: {searchTerm}
              </Tag>
            )}
            {selectedCategory && (
              <Tag
                closable
                onClose={() => setSelectedCategory(null)}
                color='blue'
              >
                Category: {selectedCategory}
              </Tag>
            )}
            {selectedLanguage && (
              <Tag
                closable
                onClose={() => setSelectedLanguage(null)}
                color='blue'
              >
                Language: {selectedLanguage}
              </Tag>
            )}
            {selectedSalary && (
              <Tag
                closable
                onClose={() => setSelectedSalary(null)}
                color='blue'
              >
                Price: {selectedSalary}
              </Tag>
            )}
            {selectedDuration.length > 0 && (
              <Tag
                closable
                onClose={() => setSelectedDuration([])}
                color='blue'
              >
                Duration: {selectedDuration.length} selected
              </Tag>
            )}
            {selectedPostedDate && (
              <Tag
                closable
                onClose={() => setSelectedPostedDate(null)}
                color='blue'
              >
                Posted: {selectedPostedDate === '24h' ? 'Last 24h' : selectedPostedDate === 'week' ? 'This Week' : 'This Month'}
              </Tag>
            )}
          </div>
        )}

        {/* View Toggle and Results Count */}
        <div className='flex justify-between items-center mt-3 sm:mt-5'>
          <div className='text-gray-600'>
            <span className='font-semibold'>{filteredBounties.length}</span> Bounties Found
          </div>
          <Viewa 
            sortBy={sortBy}
            setSortBy={setSortBy}
            perPage={perPage}
            setPerPage={setPerPage}
          />
        </div>
      </div>

      {/* Bounties Cards */}
      <div className='max-w-[100rem] w-full px-4 sm:px-6 lg:w-[90%] xl:w-[70%] m-auto'>
        {paginatedBounties.length > 0 ? (
          paginatedBounties.map((bounty) => (
            <BountiesCard
              key={bounty.id}
              cardImg={bounty.image}
              title={bounty.name}
              status='Open'
              viewDetails={() => showDrawer(bounty)}
              application={`${bounty.contributors.length} Applicants`}
              pricerange={bounty.details.bountyReward}
              dayesRemaining={`${bounty.daysRemaining} Days Remaining`}
              discription={bounty.description}
              owner={{ 
                name: bounty.contributors[0]?.name || "Unknown", 
                icon: <UserOutlined /> 
              }}
              date={`Posted ${getDaysSincePosted(bounty.details.postedDate)} days ago`}
              applicationList={bounty.contributors.map((contributor) => ({
                name: contributor.name,
                icon: <UserOutlined />,
                style: { backgroundColor: contributor.color },
              }))}
            />
          ))
        ) : (
          <div className='text-center py-10'>
            <img src={EmptyImg} alt='No results' className='mx-auto mb-4 w-48' />
            <h3 className='text-xl font-semibold text-gray-600 mb-2'>No Bounties Found</h3>
            <p className='text-gray-500'>Try adjusting your filters to see more results</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {paginatedBounties.length > 0 && (
        <div className='max-w-[100rem] w-full px-4 sm:px-6 lg:w-[90%] xl:w-[70%] m-auto py-5'>
          <CustomPagination 
            current={currentPage}
            total={sortedBounties.length}
            pageSize={perPage}
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      )}

      {/* Drawer */}
      <CustomDrawer
        width={window.innerWidth > 768 ? 540 : "100%"}
        open={open}
        onClose={onClose}
        Children={<DetailsDrawer bountyId={selectedBounty?.id} bountyData={selectedBounty} />}
        closeIcon={
          <ArrowButton text='' onClick={onClose} icon={<ArrowLeft />} />
        }
        extra={
          <div>
            <Space>
              <StanderButton onClick={handleClickDetails} text='Details' />
            </Space>
          </div>
        }
      />
    </div>
  );
};

export default Index;
