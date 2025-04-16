import React from 'react'
import Image from 'next/image'
// turn this to a navbar component  
const UserProfile = (user: any) => {
  const fallbackImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-PAu_EBlXK17AdNV7eUqDiefAPP86amtE9Q&s'
  return (
    <div className="flex flex-col items-center">
      <Image className="rounded-full" src={user.image || fallbackImage} alt="user" width={100} height={100} />
      <h1>{user.username}</h1>
      <h2>{user.name}</h2>
      <h3>{user.userId}</h3>
    </div>
  );
};

export default UserProfile