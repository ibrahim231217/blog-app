// src/components/ArticleCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleReadMore = () => {
    if (currentUser) {
      navigate(`/article/${article.id}`);
    } else {
      navigate("/login", { state: { from: `/article/${article.id}` } });
    }
  };

  return (
    <div className="bg-gray-100  rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 flex flex-col h-full">
      {/* Cover Image */}
      {article.cover_image && (
        <div className="h-48 w-full  overflow-hidden">
          <img
            src={article.cover_image}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(Array.isArray(article.tag_list)
            ? article.tag_list.slice(0, 3)
            : typeof article.tag_list === "string"
            ? article.tag_list
                .split(",")
                .map((t) => t.trim())
                .slice(0, 3)
            : []
          ).map((tag, index) => (
            <span
              key={index}
              className="bg-[#F9F4EC] text-blue-950 text-xs px-3 py-1 rounded-full font-semibold"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-blue-950 mb-2 line-clamp-2 hover:text-blue-900 transition">
          {article.title}
        </h3>

        {/* Description */}
        <p className="text-black text-sm mb-4 line-clamp-3">
          {article.description}
        </p>

        {/* Author Info */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img
              src={
                article.user?.profile_image_90 ||
                article.user?.profile_image ||
                "https://via.placeholder.com/40"
              }
              alt={article.user?.name || "Author"}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-semibold text-black">
                {article.user?.name || "Unknown"}
              </p>
              <p className="text-xs text-gray-500">
                {article.readable_publish_date}
              </p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              {article.reading_time_minutes} min read
            </span>
            <span className="flex items-center">
              {article.public_reactions_count} reactions
            </span>
            <span className="flex items-center">
              {article.comments_count} comments
            </span>
          </div>
        </div>

        {/* Read More Button */}
        <button
          onClick={handleReadMore}
          className="mt-auto w-full text-center bg-blue-950 text-white py-2 rounded-lg hover:bg-blue-900 transition font-semibold"
        >
          Read More
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
