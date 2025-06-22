import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Heart, MessageCircle, Tag, Send, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { EventPhoto, User, PhotoReaction } from '@/types';
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
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number>(0);
  const [newComment, setNewComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [localPhotos, setLocalPhotos] = useState<EventPhoto[]>(photos);

  const commonEmojis = ['❤️', '😍', '🔥', '👏', '😂', '🤩', '💯', '✨'];

  const handleReaction = (photoId: string, emoji: string) => {
    if (!currentUser) return;
    
    setLocalPhotos(prevPhotos => 
      prevPhotos.map(photo => {
        if (photo.id === photoId) {
          // Check if user already reacted with this emoji
          const existingReaction = photo.reactions.find(r => r.userId === currentUser.id && r.emoji === emoji);
          
          if (existingReaction) {
            // Remove reaction if already exists
            return {
              ...photo,
              reactions: photo.reactions.filter(r => r.id !== existingReaction.id)
            };
          } else {
            // Add new reaction
            const newReaction: PhotoReaction = {
              id: `reaction-${Date.now()}`,
              userId: currentUser.id,
              emoji,
              createdAt: new Date().toISOString()
            };
            return {
              ...photo,
              reactions: [...photo.reactions, newReaction]
            };
          }
        }
        return photo;
      })
    );

    // Update selected photo if it's the one being reacted to
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto(prev => {
        if (!prev) return prev;
        const existingReaction = prev.reactions.find(r => r.userId === currentUser.id && r.emoji === emoji);
        
        if (existingReaction) {
          return {
            ...prev,
            reactions: prev.reactions.filter(r => r.id !== existingReaction.id)
          };
        } else {
          const newReaction: PhotoReaction = {
            id: `reaction-${Date.now()}`,
            userId: currentUser.id,
            emoji,
            createdAt: new Date().toISOString()
          };
          return {
            ...prev,
            reactions: [...prev.reactions, newReaction]
          };
        }
      });
    }
  };

  const handleComment = (photoId: string) => {
    if (!newComment.trim() || !currentUser) return;
    
    const newCommentObj = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      user: currentUser,
      message: newComment.trim(),
      createdAt: new Date().toISOString()
    };

    setLocalPhotos(prevPhotos => 
      prevPhotos.map(photo => {
        if (photo.id === photoId) {
          return {
            ...photo,
            comments: [...photo.comments, newCommentObj]
          };
        }
        return photo;
      })
    );

    // Update selected photo if it's the one being commented on
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          comments: [...prev.comments, newCommentObj]
        };
      });
    }

    setNewComment('');
  };

  const handlePhotoClick = (photo: EventPhoto, index: number) => {
    setSelectedPhoto(photo);
    setSelectedPhotoIndex(index);
  };

  const handlePreviousPhoto = () => {
    if (selectedPhotoIndex > 0) {
      const newIndex = selectedPhotoIndex - 1;
      setSelectedPhotoIndex(newIndex);
      setSelectedPhoto(localPhotos[newIndex]);
    }
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex < localPhotos.length - 1) {
      const newIndex = selectedPhotoIndex + 1;
      setSelectedPhotoIndex(newIndex);
      setSelectedPhoto(localPhotos[newIndex]);
    }
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Fallback to a placeholder image if the original fails to load
    event.currentTarget.src = 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=400&fit=crop&crop=center';
  };

  if (!localPhotos || localPhotos.length === 0) {
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
            {localPhotos.map((photo, index) => (
              <div key={photo.id} className="relative group cursor-pointer">
                <img
                  src={photo.url}
                  alt="Event photo"
                  className="aspect-square object-cover rounded-lg transition-transform group-hover:scale-105"
                  onClick={() => handlePhotoClick(photo, index)}
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all rounded-lg" />
                <div className="absolute bottom-2 left-2 flex gap-1">
                  {photo.reactions.slice(0, 3).map((reaction, reactionIndex) => (
                    <span key={reactionIndex} className="text-xs bg-black/50 text-white px-1 rounded">
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
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Badge className="bg-black/50 text-white text-xs">
                    Click to view
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Photo Detail Modal */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="fixed inset-0 w-full h-full max-w-none max-h-none p-0 bg-black/95 border-0 rounded-none">
          {selectedPhoto && (
            <>
              <DialogHeader className="flex flex-row items-center justify-between p-4 bg-black/50 text-white">
                <DialogTitle className="flex items-center gap-2 text-white">
                  <span>Photo {selectedPhotoIndex + 1} of {localPhotos.length}</span>
                  {selectedPhoto.taggedUsers.length > 0 && (
                    <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                      <Tag className="w-3 h-3 mr-1" />
                      {selectedPhoto.taggedUsers.length} tagged
                    </Badge>
                  )}
                </DialogTitle>
                <Button variant="ghost" size="sm" onClick={() => setSelectedPhoto(null)} className="text-white hover:bg-white/20">
                  <X className="w-4 h-4" />
                </Button>
              </DialogHeader>
              
              <div className="flex flex-col h-full">
                {/* Photo Section */}
                <div className="flex-1 relative flex items-center justify-center p-4">
                  <img
                    src={selectedPhoto.url}
                    alt="Event photo"
                    className="photo-modal-img max-w-full max-h-full object-contain rounded-lg cursor-pointer hover:scale-105 transition-transform"
                    onError={handleImageError}
                    onClick={(e) => {
                      // Toggle full screen view
                      const img = e.currentTarget;
                      if (img.classList.contains('scale-150')) {
                        img.classList.remove('scale-150');
                      } else {
                        img.classList.add('scale-150');
                      }
                    }}
                  />
                  
                  {/* Navigation Arrows */}
                  {localPhotos.length > 1 && (
                    <>
                      {selectedPhotoIndex > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={handlePreviousPhoto}
                        >
                          <ChevronLeft className="w-4 h-4" />
                        </Button>
                      )}
                      {selectedPhotoIndex < localPhotos.length - 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white hover:bg-black/70"
                          onClick={handleNextPhoto}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </Button>
                      )}
                    </>
                  )}
                </div>

                {/* Comments and Reactions Section */}
                <div className="p-4 bg-white border-t border-gray-200">
                  {/* Reactions */}
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2">Reactions</h4>
                    <div className="flex gap-2 flex-wrap">
                      {commonEmojis.map((emoji) => {
                        const hasReacted = selectedPhoto.reactions.some(
                          r => r.userId === currentUser?.id && r.emoji === emoji
                        );
                        return (
                          <Button
                            key={emoji}
                            variant={hasReacted ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleReaction(selectedPhoto.id, emoji)}
                            className={`text-lg p-2 h-auto ${hasReacted ? 'bg-blue-500 text-white' : ''}`}
                          >
                            {emoji}
                          </Button>
                        );
                      })}
                    </div>
                    
                    {/* Current Reactions */}
                    {selectedPhoto.reactions.length > 0 && (
                      <div className="mt-3">
                        <h5 className="text-sm font-medium mb-2">Current Reactions</h5>
                        <div className="flex gap-2 flex-wrap">
                          {selectedPhoto.reactions.map((reaction) => (
                            <Badge key={reaction.id} variant="outline" className="text-sm">
                              {reaction.emoji} {attendees.find(u => u.id === reaction.userId)?.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Comments */}
                  <div className="flex-1 flex flex-col">
                    <h4 className="font-semibold mb-2">Comments</h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {selectedPhoto.comments.map((comment) => (
                        <div key={comment.id} className="flex gap-2 p-2 bg-muted rounded">
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
                    <div className="flex gap-2 mt-4">
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
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
