FasdUAS 1.101.10   ��   ��    k             l     ��  ��    $  say "Welcome to SmartSlides!"     � 	 	 <   s a y   " W e l c o m e   t o   S m a r t S l i d e s ! "   
  
 l     ��������  ��  ��        l     ��  ��    ? 9 https://iworkautomation.com/keynote/document-export.html     �   r   h t t p s : / / i w o r k a u t o m a t i o n . c o m / k e y n o t e / d o c u m e n t - e x p o r t . h t m l   ��  l    e ����  O     e    k    d       I   	������
�� .miscactvnull��� ��� null��  ��        l  
 
��������  ��  ��        l  
 
��  ��      destination folder     �   &   d e s t i n a t i o n   f o l d e r       O   
 . ! " ! k    - # #  $ % $ r     & ' & c     ( ) ( n     * + * m    ��
�� 
ctnr + l    ,���� , I   �� -��
�� .earsffdralis        afdr -  f    ��  ��  ��   ) m    ��
�� 
alis ' o      ���� 0 currentfolder currentFolder %  . / . r    % 0 1 0 l   # 2���� 2 I   #���� 3
�� .sysostdfalis    ��� null��   3 �� 4 5
�� 
dflc 4 o    ���� 0 currentfolder currentFolder 5 �� 6��
�� 
prmp 6 m     7 7 � 8 8 0 C h o o s e   t h e   p r e s e n t a t i o n :��  ��  ��   1 l      9���� 9 o      ���� (0 chosendocumentfile chosenDocumentFile��  ��   /  : ; : l  & &�� < =��   < ) #set newFolderName to "presentation"    = � > > F s e t   n e w F o l d e r N a m e   t o   " p r e s e n t a t i o n " ;  ? @ ? l  & &�� A B��   A  set incI to 1    B � C C  s e t   i n c I   t o   1 @  D E D l  & &�� F G��   F P Jrepeat until not (exists folder newFolderName of defaultDestinationFolder)    G � H H � r e p e a t   u n t i l   n o t   ( e x i s t s   f o l d e r   n e w F o l d e r N a m e   o f   d e f a u l t D e s t i n a t i o n F o l d e r ) E  I J I l  & &�� K L��   K B <	set newFolderName to newFolderName & "-" & (incI as string)    L � M M x 	 s e t   n e w F o l d e r N a m e   t o   n e w F o l d e r N a m e   &   " - "   &   ( i n c I   a s   s t r i n g ) J  N O N l  & &�� P Q��   P  	set incI to incI + 1    Q � R R * 	 s e t   i n c I   t o   i n c I   +   1 O  S T S l  & &�� U V��   U  
end repeat    V � W W  e n d   r e p e a t T  X Y X l  & &�� Z [��   Z  set p to path to desktop    [ � \ \ 0 s e t   p   t o   p a t h   t o   d e s k t o p Y  ] ^ ] l  & &�� _ `��   _ W Qset the targetFolder to make new folder at p with properties {name:newFolderName}    ` � a a � s e t   t h e   t a r g e t F o l d e r   t o   m a k e   n e w   f o l d e r   a t   p   w i t h   p r o p e r t i e s   { n a m e : n e w F o l d e r N a m e } ^  b�� b r   & - c d c c   & + e f e l  & ) g���� g b   & ) h i h o   & '���� 0 currentfolder currentFolder i m   ' ( j j � k k  / p��  ��   f m   ) *��
�� 
TEXT d l      l���� l o      ���� *0 targetfolderhfspath targetFolderHFSPath��  ��  ��   " m   
  m m�                                                                                  MACS  alis    @  Macintosh HD                   BD ����
Finder.app                                                     ����            ����  
 cu             CoreServices  )/:System:Library:CoreServices:Finder.app/    
 F i n d e r . a p p    M a c i n t o s h   H D  &System/Library/CoreServices/Finder.app  / ��      n o n l  / /��������  ��  ��   o  p q p l  / /�� r s��   r  
export doc    s � t t  e x p o r t   d o c q  u v u r   / 8 w x w l  / 4 y���� y I  / 4�� z��
�� .aevtodocnull  �    alis z o   / 0���� (0 chosendocumentfile chosenDocumentFile��  ��  ��   x l      {���� { o      ����  0 chosendocument chosenDocument��  ��   v  | } | t   9 T ~  ~ I  = S�� � �
�� .Knstexponull���     docu � o   = @����  0 chosendocument chosenDocument � �� � �
�� 
exft � m   C F��
�� KnefKhtm � �� ���
�� 
kfil � 4   I O�� �
�� 
file � o   M N���� *0 targetfolderhfspath targetFolderHFSPath��    m   9 <����� }  � � � I  U \�� ���
�� .coreclosnull���     obj  � o   U X����  0 chosendocument chosenDocument��   �  ��� � I  ] d�� ���
�� .sysodlogaskr        TEXT � m   ] ` � � � � �  D o n e��  ��    m      � ��                                                                                  keyn  alis    &  Macintosh HD                   BD ����Keynote.app                                                    ����            ����  
 cu             Applications  /:Applications:Keynote.app/     K e y n o t e . a p p    M a c i n t o s h   H D  Applications/Keynote.app  / ��  ��  ��  ��       
�� � � � � � ���������   � ����������������
�� .aevtoappnull  �   � ****�� 0 currentfolder currentFolder�� (0 chosendocumentfile chosenDocumentFile�� *0 targetfolderhfspath targetFolderHFSPath��  0 chosendocument chosenDocument��  ��  ��   � �� ����� � ���
�� .aevtoappnull  �   � **** � k     e � �  ����  ��  ��   �   �  ��� m������������ 7������ j���������������������� ���
�� .miscactvnull��� ��� null
�� .earsffdralis        afdr
�� 
ctnr
�� 
alis�� 0 currentfolder currentFolder
�� 
dflc
�� 
prmp�� 
�� .sysostdfalis    ��� null�� (0 chosendocumentfile chosenDocumentFile
�� 
TEXT�� *0 targetfolderhfspath targetFolderHFSPath
�� .aevtodocnull  �    alis��  0 chosendocument chosenDocument���
�� 
exft
�� KnefKhtm
�� 
kfil
�� 
file
�� .Knstexponull���     docu
�� .coreclosnull���     obj 
�� .sysodlogaskr        TEXT�� f� b*j O� !)j �,�&E�O*����� E�O��%�&E�UO�j E` Oa n_ a a a *a �/� oO_ j Oa j U ��alis    �  Macintosh HD                   BD ����testing_apple_script                                           ����            ����  
 cu             final_project   S/:Users:gecanow:Desktop:mit_senior_spring:6-835:final_project:testing_apple_script/   *  t e s t i n g _ a p p l e _ s c r i p t    M a c i n t o s h   H D  PUsers/gecanow/Desktop/mit_senior_spring/6-835/final_project/testing_apple_script  /    ��   ��alis    �   Macintosh HD                   BD ����6.835 User Research.pptx                                       ����            ����  J cu            k/:Users:gecanow:Desktop:mit_senior_spring:6-835:final_project:testing_apple_script:6.835 User Research.pptx   2  6 . 8 3 5   U s e r   R e s e a r c h . p p t x    M a c i n t o s h   H D  iUsers/gecanow/Desktop/mit_senior_spring/6-835/final_project/testing_apple_script/6.835 User Research.pptx   /    ��   � � � � � M a c i n t o s h   H D : U s e r s : g e c a n o w : D e s k t o p : m i t _ s e n i o r _ s p r i n g : 6 - 8 3 5 : f i n a l _ p r o j e c t : t e s t i n g _ a p p l e _ s c r i p t : / p �  � �  ��� ���
�� 
docu � � � � H F F 4 0 1 9 7 E - 0 2 4 0 - 4 F 0 7 - 9 0 4 B - E 9 2 0 A 7 A 5 3 0 C B
�� kfrmID  ��  ��  ��   ascr  ��ޭ