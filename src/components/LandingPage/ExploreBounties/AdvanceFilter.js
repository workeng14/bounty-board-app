/** @format */

import React from "react";
import {
  Dropdown,
  Button,
  Checkbox,
  Radio,
  Badge,
} from "antd";
import {
  DownOutlined,
  FilterOutlined,
} from "@ant-design/icons";

const AdvanceFilterDropdown = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedSalary,
  setSelectedSalary,
  selectedDuration,
  setSelectedDuration,
  selectedPostedDate,
  setSelectedPostedDate,
  mobile = false,
}) => {

  // Calculate active filters count
  const activeFiltersCount = [
    selectedLanguage,
    selectedSalary,
    selectedDuration?.length > 0,
    selectedPostedDate,
  ].filter(Boolean).length;

  const handleClearAll = () => {
    setSelectedLanguage(null);
    setSelectedSalary(null);
    setSelectedDuration([]);
    setSelectedPostedDate(null);
  };

  const content = (
    <div className={`${mobile ? 'w-full' : ''}`}>
      <div className={`grid ${mobile ? 'grid-cols-1' : 'grid-cols-4'} gap-6 p-4 ${mobile ? 'w-full' : 'min-w-[750px]'} bg-white rounded-lg shadow-md`}>
        <div>
          <p className='font-medium mb-2'>Languages</p>
          <Radio.Group
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value)}
            className='flex flex-col space-y-1'
          >
            {[
              "JavaScript",
              "TypeScript",
              "Python",
              "Java",
              "Kotlin",
              "Swift",
              "PHP",
              "C++",
            ].map((lang) => (
              <Radio key={lang} value={lang}>
                {lang}
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <div>
          <p className='font-medium mb-2'>Price</p>
          <Radio.Group
            value={selectedSalary}
            onChange={(e) => setSelectedSalary(e.target.value)}
            className='flex flex-col space-y-1'
          >
            {[
              "$50 - $1000",
              "$1000 - $2000",
              "$2000 - $4000",
              "$4000 - $6000",
              "$6000 - $8000",
              "$8000 - $10000",
              "$10000 - $15000",
              "$15000+",
            ].map((range) => (
              <Radio key={range} value={range}>
                {range}
              </Radio>
            ))}
          </Radio.Group>
        </div>

        <div>
          <p className='font-medium mb-2'>Estimated Duration</p>
          <Checkbox.Group
            value={selectedDuration}
            onChange={setSelectedDuration}
            className='flex flex-col space-y-1'
          >
            <Checkbox value='all'>All</Checkbox>
            <Checkbox value='<1'>{"< 1 week"}</Checkbox>
            <Checkbox value='1-2'>1–2 weeks</Checkbox>
            <Checkbox value='1month'>1 month</Checkbox>
            <Checkbox value='ongoing'>Ongoing</Checkbox>
          </Checkbox.Group>
        </div>

        <div>
          <p className='font-medium mb-2'>Posted Date</p>
          <Radio.Group
            value={selectedPostedDate}
            onChange={(e) => setSelectedPostedDate(e.target.value)}
            className='flex flex-col space-y-1'
          >
            <Radio value='24h'>Last 24 hours</Radio>
            <Radio value='week'>This week</Radio>
            <Radio value='month'>This month</Radio>
          </Radio.Group>
        </div>
      </div>
      
      {/* Clear Filters Button */}
      {activeFiltersCount > 0 && (
        <div className='p-4 border-t border-gray-200 flex justify-end'>
          <Button type='link' onClick={handleClearAll} danger>
            Clear All Filters ({activeFiltersCount})
          </Button>
        </div>
      )}
    </div>
  );

  return (
    <Dropdown overlay={content} trigger={["click"]} placement='bottomLeft'>
      <Badge count={activeFiltersCount} size="small" offset={[-5, 5]}>
        <Button
          className='w-36 flex items-center justify-between text-[#767E94]'
          type='text'
        >
          Advance Filter <DownOutlined />
        </Button>
      </Badge>
    </Dropdown>
  );
};

export default AdvanceFilterDropdown;
