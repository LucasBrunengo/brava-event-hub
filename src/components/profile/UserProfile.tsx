import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Users, Calendar, Camera, UserPlus, Check } from 'lucide-react';
import { UserProfile as UserProfileType, Event } from '@/types';
import { format } from 'date-fns';

interface UserProfileProps {
  userProfile: UserProfileType;
  onBack: () => void;
}

export const UserProfile: React.FC<UserProfileProps> = ({ userProfile, onBack }) => {
  const { user, mutualFriends, sharedEvents, sharedPhotos, friendship } = userProfile;
  const [friendRequestSent, setFriendRequestSent] = useState(false);

  const canViewFullProfile = friendship?.status === 'accepted';
  const isFriend = friendship?.status === 'accepted';
  const hasRequestPending = friendship?.status === 'pending';

  const handleAddFriend = () => {
    setFriendRequestSent(true);
    // Here you would typically make an API call to send the friend request
  };

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <h1 className="text-xl font-bold">Profile</h1>
      </div>

      {/* User Info */}
      <Card>
        <CardContent className="p-6 text-center">
          <Avatar className="w-20 h-20 mx-auto mb-4">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="text-2xl">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="text-xl font-bold mb-1">{user.name}</h2>
          {canViewFullProfile ? (
            <>
              <p className="text-muted-foreground mb-2">{user.email}</p>
              {user.bio && <p className="text-sm mb-2">{user.bio}</p>}
              {user.location && <p className="text-sm text-muted-foreground mb-2">📍 {user.location}</p>}
              {user.joinedDate && (
                <p className="text-xs text-muted-foreground">
                  Member since {format(new Date(user.joinedDate), 'MMM yyyy')}
                </p>
              )}
            </>
          ) : (
            <>
              <p className="text-muted-foreground mb-4">
                {hasRequestPending || friendRequestSent 
                  ? 'Friend request sent' 
                  : 'Send a friend request to see full profile'
                }
              </p>
              {!isFriend && !hasRequestPending && !friendRequestSent && (
                <Button className="brava-gradient" onClick={handleAddFriend}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Friend
                </Button>
              )}
              {(hasRequestPending || friendRequestSent) && (
                <Button variant="outline" disabled>
                  <Check className="w-4 h-4 mr-2" />
                  Request Sent
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-3 text-center">
            <Users className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-sm font-bold">{mutualFriends}</p>
            <p className="text-xs text-muted-foreground">Mutual Friends</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Calendar className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-sm font-bold">{sharedEvents.length}</p>
            <p className="text-xs text-muted-foreground">Events Together</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-3 text-center">
            <Camera className="w-5 h-5 mx-auto mb-1 text-primary" />
            <p className="text-sm font-bold">{sharedPhotos.length}</p>
            <p className="text-xs text-muted-foreground">Shared Photos</p>
          </CardContent>
        </Card>
      </div>

      {/* Shared Events */}
      {sharedEvents.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Events Together</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sharedEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium text-sm">{event.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(event.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {event.organizerId === user.id ? 'Organized' : 'Attended'}
                  </Badge>
                </div>
              ))}
              {sharedEvents.length > 5 && (
                <p className="text-center text-sm text-muted-foreground">
                  +{sharedEvents.length - 5} more events
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Shared Photos */}
      {canViewFullProfile && sharedPhotos.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Shared Photos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2">
              {sharedPhotos.slice(0, 6).map((photo) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt="Shared photo"
                  className="aspect-square object-cover rounded"
                />
              ))}
            </div>
            {sharedPhotos.length > 6 && (
              <p className="text-center text-sm text-muted-foreground mt-2">
                +{sharedPhotos.length - 6} more photos
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};
