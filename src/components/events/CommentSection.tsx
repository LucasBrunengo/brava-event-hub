import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { useApp } from '@/context/AppContext';
import { formatDistanceToNow } from 'date-fns';
import { User } from '@/types';

interface CommentSectionProps {
  eventId: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ eventId }) => {
  const { comments, currentUser, addComment, setViewedProfile } = useApp();
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventComments = comments
    .filter(c => c.eventId === eventId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !currentUser) return;

    setIsSubmitting(true);
    try {
      addComment(eventId, newComment.trim());
      setNewComment('');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUserClick = (user: User) => {
    setViewedProfile(user);
  };

  return (
    <div className="space-y-4">
      {/* Add Comment */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Discussion</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-3">
            <Textarea
              placeholder="Add a comment or ask a question..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
            />
            <Button
              type="submit"
              disabled={!newComment.trim() || isSubmitting}
              className="brava-gradient hover:opacity-90"
            >
              {isSubmitting ? 'Posting...' : 'Post Comment'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Comments List */}
      {eventComments.length === 0 ? (
        <Card>
          <CardContent className="p-6 text-center">
            <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              💬
            </div>
            <h3 className="font-semibold mb-2">No Comments Yet</h3>
            <p className="text-muted-foreground text-sm">
              Start the conversation about this event
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {eventComments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-4">
                <div className="flex gap-3">
                  <button onClick={() => handleUserClick(comment.user)}>
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>
                        {comment.user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <button onClick={() => handleUserClick(comment.user)} className="font-semibold text-sm hover:underline">
                        {comment.user.name}
                      </button>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{comment.message}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
