
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, MessageCircle, Tag, Send } from 'lucide-react';
import { EventPhoto, User } from '@/types';
import { useApp } from '@/context/AppContext';
import { formatDistanceToNow } from 'date-fns';

interface PhotoGalleryProps {
  photos: EventPhoto[];
  attendees: User[];
  eventId: string;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos, attendees, eventId }) => {
  const { currentUser } = useApp();
  const [selectedPhoto, setSelectedPhoto] = useState<EventPhoto | null>(null);
  const [newComment, setNewComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');

  const commonEmojis = ['❤️', '😍', '🔥', '👏', '😂', '🤩', '💯', '✨'];

  const handleReaction = (photoId: string, emoji: string) => {
    // In a real app, this would update the backend
    console.log(`User ${currentUser?.id} reacted with ${emoji} to photo ${photoId}`);
  };

  const handleComment = (photoId: string) => {
    if (!newComment.trim()) return;
    // In a real app, this would update the backend
    console.log(`User ${currentUser?.id} commented "${newComment}" on photo ${photoId}`);
    setNewComment('');
  };

  if (!photos || photos.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
            📷
          </div>
          <h3 className="font-semibold mb-2">No Photos Yet</h3>
          <p className="text-muted-foreground text-sm">
            Photos from the event will appear here
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Event Gallery</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            {photos.map((photo) => (
              <div key={photo.id} className="relative group cursor-pointer">
                <img
                  src={photo.url}
                  alt="Event photo"
                  className="aspect-square object-cover rounded-lg"
                  onClick={() => setSelectedPhoto(photo)}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg" />
                <div className="absolute bottom-2 left-2 flex gap-1">
                  {photo.reactions.slice(0, 3).map((reaction, index) => (
                    <span key={index} className="text-xs bg-black/50 text-white px-1 rounded">
                      {reaction.emoji}
                    </span>
                  ))}
                  {photo.reactions.length > 3 && (
                    <span className="text-xs bg-black/50 text-white px-1 rounded">
                      +{photo.reactions.length - 3}
                    </span>
                  )}
                </div>
                {photo.taggedUsers.length > 0 && (
                  <div className="absolute top-2 right-2">
                    <Badge className="bg-black/50 text-white text-xs">
                      <Tag className="w-3 h-3 mr-1" />
                      {photo.taggedUsers.length}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Photo Detail Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-md">
          {selectedPhoto && (
            <>
              <DialogHeader>
                <DialogTitle>Photo Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <img
                  src={selectedPhoto.url}
                  alt="Event photo"
                  className="w-full aspect-square object-cover rounded-lg"
                />
                
                {/* Reactions */}
                <div className="flex gap-2 flex-wrap">
                  {commonEmojis.map((emoji) => (
                    <Button
                      key={emoji}
                      variant="outline"
                      size="sm"
                      onClick={() => handleReaction(selectedPhoto.id, emoji)}
                      className="text-lg p-2 h-auto"
                    >
                      {emoji}
                    </Button>
                  ))}
                </div>

                {/* Current Reactions */}
                {selectedPhoto.reactions.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    {selectedPhoto.reactions.map((reaction) => (
                      <Badge key={reaction.id} variant="outline">
                        {reaction.emoji} {attendees.find(u => u.id === reaction.userId)?.name}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Comments */}
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {selectedPhoto.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src={comment.user.avatar} />
                        <AvatarFallback className="text-xs">
                          {comment.user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-semibold">{comment.user.name}</span>
                          <span className="ml-2">{comment.message}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Comment */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleComment(selectedPhoto.id)}
                  />
                  <Button 
                    size="sm" 
                    onClick={() => handleComment(selectedPhoto.id)}
                    disabled={!newComment.trim()}
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
