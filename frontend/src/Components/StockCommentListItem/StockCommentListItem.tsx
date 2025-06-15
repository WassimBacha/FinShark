import React from 'react'
import { CommentGet } from '../../Models/Comment'

interface Props {
  comment: CommentGet
}

const StockCommentListItem = ({ comment }: Props) => {
  return (
    <div className="relative w-full mb-8 p-4 rounded-lg border shadow-md transition-shadow duration-300 
                    bg-white border-gray-200 text-gray-800 
                    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-100">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold truncate">{comment.title}</p>
          
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">@{comment.createdBy}</p>
        <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
      </div>
    </div>
  )
}

export default StockCommentListItem
