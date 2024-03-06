import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({ 
  items, 
  isLoading, 
  searchValue, 
  setSearchValue,
  handleAddClick,
  invited,
  handleSendClick
}) => {
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input 
        value={searchValue} 
        onChange={(e)=> setSearchValue(e.target.value)} 
        type="text" placeholder="Search the customer..." 
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} />
          ))}
        </div>
      ) : (
        <ul className="users-list">
          {
            items.filter(item => {
              const fullName = (item.first_name + item.last_name).toLowerCase();
              const value = searchValue.toLowerCase();

              return fullName.includes(value);
            })
            .map(item => (
              <User isInvited={invited.includes(item.id)} key={item.id} {...item} handleAddClick={handleAddClick}/>
            ))
          }
        </ul>
      )}
      {
        invited.length > 0 && <button onClick={handleSendClick} className="send-invite-btn">Send the message</button>
      }
    </>
  );
};
