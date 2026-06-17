import { useEffect, useState } from "react";
import { getProfile } from "../api/musicApi";

const UserProfile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {

    const fetchProfile = async () => {

      try {

        const data = await getProfile();

        setUser(data);

      } catch (err) {

        console.log(err);

      }

    };

    fetchProfile();

  }, []);

  if (!user) {

    return (
      <div className="text-white p-10">
        Loading...
      </div>
    );

  }

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl font-bold mb-8">
        My Profile
      </h1>

      <div className="bg-zinc-900 p-6 rounded-lg">

        <h2 className="text-2xl font-semibold mb-4">
          {user.username}
        </h2>

        <p className="mb-2">
          Email: {user.email}
        </p>

        <p>
          Role: {user.role}
        </p>

      </div>

    </div>

  );

};

export default UserProfile;