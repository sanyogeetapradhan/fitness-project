import React, { useState } from 'react';
import { motion , AnimatePresence } from 'framer-motion';
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  Award,
  Trophy,
  Target,
  TrendingUp,
  User
} from 'lucide-react';

interface Post {
  id: string;
  user: {
    name: string;
    avatar: string;
    level: string;
  };
  content: string;
  image?: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
  achievement?: {
    title: string;
    icon: any;
  };
}

const mockPosts: Post[] = [
  {
    id: '1',
    user: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      level: 'Gold Member'
    },
    content: 'Just completed my first 5K run! 🏃‍♀️ Feeling amazing and proud of this milestone.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 24,
    comments: 8,
    shares: 3,
    timestamp: '2h ago',
    achievement: {
      title: 'Running Champion',
      icon: Trophy
    }
  },
  {
    id: '2',
    user: {
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
      level: 'Silver Member'
    },
    content: 'Meal prep Sunday! Prepared healthy lunches for the entire week. Who else loves meal prepping?',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    likes: 18,
    comments: 5,
    shares: 2,
    timestamp: '4h ago'
  }
];

const leaderboardData = [
  {
    rank: 1,
    user: 'Sarah Johnson',
    points: 2500,
    achievements: 12
  },
  {
    rank: 2,
    user: 'Mike Chen',
    points: 2350,
    achievements: 10
  },
  {
    rank: 3,
    user: 'Emma Wilson',
    points: 2200,
    achievements: 9
  }
];

const Community = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState('');

  const handleLike = (postId: string) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, likes: post.likes + 1 }
        : post
    ));
  };

  const handleAddPost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: Date.now().toString(),
        user: {
          name: 'You',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
          level: 'Gold Member'
        },
        content: newPost,
        likes: 0,
        comments: 0,
        shares: 0,
        timestamp: 'Just now'
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setShowNewPost(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Community</h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewPost(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center"
          >
            Share Your Journey
          </motion.button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {posts.map(post => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div className="ml-3">
                    <h3 className="font-semibold">{post.user.name}</h3>
                    <p className="text-sm text-gray-500">{post.timestamp}</p>
                  </div>
                  {post.achievement && (
                    <div className="ml-auto flex items-center bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                      <post.achievement.icon className="h-4 w-4 mr-2" />
                      <span className="text-sm">{post.achievement.title}</span>
                    </div>
                  )}
                </div>

                <p className="mb-4">{post.content}</p>

                {post.image && (
                  <img
                    src={post.image}
                    alt="Post content"
                    className="w-full h-64 object-cover rounded-lg mb-4"
                  />
                )}

                <div className="flex items-center justify-between pt-4 border-t">
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center text-gray-600 hover:text-indigo-600"
                  >
                    <Heart className="h-5 w-5 mr-1" />
                    <span>{post.likes}</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-indigo-600">
                    <MessageCircle className="h-5 w-5 mr-1" />
                    <span>{post.comments}</span>
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-indigo-600">
                    <Share2 className="h-5 w-5 mr-1" />
                    <span>{post.shares}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
                Leaderboard
              </h3>
              <div className="space-y-4">
                {leaderboardData.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        index === 0 ? 'bg-yellow-500' :
                        index === 1 ? 'bg-gray-400' :
                        'bg-orange-500'
                      } text-white text-sm font-bold`}>
                        {item.rank}
                      </span>
                      <span className="ml-3 font-medium">{item.user}</span>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{item.points} pts</p>
                      <p className="text-sm text-gray-500">
                        {item.achievements} achievements
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Challenges */}
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Target className="h-6 w-6 text-indigo-600 mr-2" />
                Active Challenges
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: '30-Day Water Challenge',
                    participants: 128,
                    progress: 70
                  },
                  {
                    title: 'Morning Workout Club',
                    participants: 85,
                    progress: 45
                  }
                ].map((challenge, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{challenge.title}</h4>
                      <span className="text-sm text-gray-500">
                        {challenge.participants} participants
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${challenge.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Post Modal */}
      <AnimatePresence>
        {showNewPost && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-white rounded-xl p-6 max-w-lg w-full mx-4"
            >
              <h3 className="text-xl font-bold mb-4">Share Your Journey</h3>
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full p-4 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows={4}
              />
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddPost}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  disabled={!newPost.trim()}
                >
                  Post
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Community;