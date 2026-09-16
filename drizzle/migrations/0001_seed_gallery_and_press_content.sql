INSERT INTO public.gallery_images (image_url, alt_text, caption, size, sort_order, published) VALUES
('/__l5e/assets-v1/3db37daf-c8ee-4b60-a499-bb5a7f75103b/che-z-bizzie-stage.jpeg','Che.z Bizzie performing on a large stage','On stage, Lagos','large',1,true),
('/__l5e/assets-v1/7966025d-c5f1-45e5-b4aa-7e57b5b61e53/che-z-bizzie-live-white.jpeg','Che.z Bizzie performing in a white cap and graphic shirt','Live and direct','normal',2,true),
('/__l5e/assets-v1/61ce78b0-4200-4964-9468-4ebaf2ebc39d/che-z-bizzie-live-black.jpeg','Che.z Bizzie performing in a black graphic shirt','Room full of colour','normal',3,true),
('/__l5e/assets-v1/04e26100-6dbf-497e-84e6-053b3de6e57b/che-z-bizzie-lord-of-the-drinks.jpeg','Che.z Bizzie performing in a red shirt at Lord of the Drinks East','Lord of the Drinks East','normal',4,true),
('/press/press-shot.jpg','Che.z Bizzie press portrait','Press shot','large',5,true),
('/press/portrait-street.jpg','Che.z Bizzie street portrait','Street portrait','normal',6,true),
('/press/portrait-neon.jpg','Che.z Bizzie portrait under neon light','Neon portrait','normal',7,true),
('/press/portrait-orange.jpg','Che.z Bizzie portrait in warm orange light','Warm light','normal',8,true),
('/press/live-stage.jpg','Che.z Bizzie live on stage','Live stage','large',9,true),
('/press/crowd.jpg','Crowd at a Che.z Bizzie performance','The crowd','normal',10,true),
('/press/backstage.jpg','Che.z Bizzie backstage before a show','Backstage','normal',11,true),
('/press/studio-session.jpg','Che.z Bizzie recording in the studio','Studio session','normal',12,true);

INSERT INTO public.press_assets (title, asset_type, file_url, external_url, description, sort_order) VALUES
('Press shot','photo','/press/press-shot.jpg',NULL,'Primary press portrait — high resolution',1),
('Street portrait','photo','/press/portrait-street.jpg',NULL,'Editorial street portrait',2),
('Neon portrait','photo','/press/portrait-neon.jpg',NULL,'Night portrait under neon light',3),
('Live stage','photo','/press/live-stage.jpg',NULL,'Live performance photograph',4),
('Studio session','photo','/press/studio-session.jpg',NULL,'Behind the scenes in the studio',5),
('Logo','logo','/press/logo.png',NULL,'Official artist logo',6),
('Beautiful','audio',NULL,'https://open.spotify.com/track/1eKFDBN0VhvsjU5IvvNyhS','Melody-led Afrobeats and R&B single',7),
('Quality','audio',NULL,'https://open.spotify.com/track/23cHuEjfbVacf0HUHpngVV','Patient grooves built for late-night listening',8),
('Rainfall','audio',NULL,'https://open.spotify.com/track/21o4vQRSXASCF1cy9sMEWO','Contemporary cut balancing rhythm and atmosphere',9);