FasdUAS 1.101.10   ��   ��    k             l     ��  ��    $  say "Welcome to SmartSlides!"     � 	 	 <   s a y   " W e l c o m e   t o   S m a r t S l i d e s ! "   
  
 l     ��������  ��  ��        l     ����  I    �� ��
�� .sysodlogaskr        TEXT  m        �   � W e l c o m e   t o   S m a r t S l i d e s !   Y o u   w i l l   f i r s t   b e   p r o m p t e d   t o   c h o o s e   a   p r e s e n t a t i o n .��  ��  ��        l   	 ����  r    	    m       �   ( p u b l i c : p r e s e n t a t i o n :  o      ���� 0 prezdir prezDir��  ��        l  
  ����  r   
     m   
    �    a s s e t s _ t m p  o      ���� 0 tempdir tempDir��  ��       !   l    "���� " r     # $ # m     % % � & &  a s s e t s $ o      ���� 0 	assetsdir 	assetsDir��  ��   !  ' ( ' l     ��������  ��  ��   (  ) * ) l     �� + ,��   + - ' (1) Get the presentation from the user    , � - - N   ( 1 )   G e t   t h e   p r e s e n t a t i o n   f r o m   t h e   u s e r *  . / . l   H 0���� 0 O    H 1 2 1 k    G 3 3  4 5 4 I   ������
�� .miscactvnull��� ��� obj ��  ��   5  6 7 6 r    ' 8 9 8 c    % : ; : n    # < = < m   ! #��
�� 
ctnr = l   ! >���� > I   !�� ?��
�� .earsffdralis        afdr ?  f    ��  ��  ��   ; m   # $��
�� 
alis 9 o      ���� 0 
defaultdir 
defaultDir 7  @ A @ r   ( 9 B C B l  ( 5 D���� D I  ( 5���� E
�� .sysostdfalis    ��� null��   E �� F G
�� 
dflc F o   * +���� 0 
defaultdir 
defaultDir G �� H��
�� 
prmp H m   , / I I � J J H C h o o s e   t h e   S m a r t S l i d e s   p r e s e n t a t i o n :��  ��  ��   C l      K���� K o      ���� (0 chosendocumentfile chosenDocumentFile��  ��   A  L�� L r   : G M N M c   : C O P O l  : ? Q���� Q b   : ? R S R b   : = T U T o   : ;���� 0 
defaultdir 
defaultDir U o   ; <���� 0 prezdir prezDir S o   = >���� 0 tempdir tempDir��  ��   P m   ? B��
�� 
TEXT N l      V���� V o      ���� *0 targetfolderhfspath targetFolderHFSPath��  ��  ��   2 m     W W�                                                                                  MACS  alis    @  Macintosh HD                   BD ����
Finder.app                                                     ����            ����  
 cu             CoreServices  )/:System:Library:CoreServices:Finder.app/    
 F i n d e r . a p p    M a c i n t o s h   H D  &System/Library/CoreServices/Finder.app  / ��  ��  ��   /  X Y X l     ��������  ��  ��   Y  Z [ Z l     �� \ ]��   \ * $ (2) Export the presentation to HTML    ] � ^ ^ H   ( 2 )   E x p o r t   t h e   p r e s e n t a t i o n   t o   H T M L [  _ ` _ l  I � a���� a O   I � b c b k   O � d d  e f e I  O T������
�� .miscactvnull��� ��� obj ��  ��   f  g h g l  U U��������  ��  ��   h  i j i l  U U�� k l��   k ? 9 https://iworkautomation.com/keynote/document-export.html    l � m m r   h t t p s : / / i w o r k a u t o m a t i o n . c o m / k e y n o t e / d o c u m e n t - e x p o r t . h t m l j  n o n r   U ` p q p l  U \ r���� r I  U \�� s��
�� .aevtodocnull  �    alis s o   U X���� (0 chosendocumentfile chosenDocumentFile��  ��  ��   q l      t���� t o      ����  0 chosendocument chosenDocument��  ��   o  u v u t   a � w x w I  e �� y z
�� .Knstexponull���     docu y o   e h����  0 chosendocument chosenDocument z �� { |
�� 
exft { m   k n��
�� KnefKhtm | �� }��
�� 
kfil } 4   q y�� ~
�� 
file ~ o   u x���� *0 targetfolderhfspath targetFolderHFSPath��   x m   a d����� v  ��  I  � ��� ���
�� .coreclosnull���     obj  � o   � �����  0 chosendocument chosenDocument��  ��   c m   I L � ��                                                                                  keyn  alis    &  Macintosh HD                   BD ����Keynote.app                                                    ����            ����  
 cu             Applications  /:Applications:Keynote.app/     K e y n o t e . a p p    M a c i n t o s h   H D  Applications/Keynote.app  / ��  ��  ��   `  � � � l     ��������  ��  ��   �  � � � l     �� � ���   � O I (3) move the new presentation assets into the public/presentation folder    � � � � �   ( 3 )   m o v e   t h e   n e w   p r e s e n t a t i o n   a s s e t s   i n t o   t h e   p u b l i c / p r e s e n t a t i o n   f o l d e r �  � � � l  � ����� � O   � � � � k   � � �  � � � l  � ��� � ���   � , & newly minted assets folder of tmp dir    � � � � L   n e w l y   m i n t e d   a s s e t s   f o l d e r   o f   t m p   d i r �  � � � r   � � � � � c   � � � � � l  � � ����� � b   � � � � � b   � � � � � l  � � ����� � c   � � � � � l  � � ����� � b   � � � � � b   � � � � � o   � ����� 0 
defaultdir 
defaultDir � o   � ����� 0 prezdir prezDir � o   � ����� 0 tempdir tempDir��  ��   � m   � ���
�� 
TEXT��  ��   � m   � � � � � � �  : � o   � ����� 0 	assetsdir 	assetsDir��  ��   � m   � ���
�� 
TEXT � o      ���� 0 assetsfolder assetsFolder �  � � � l  � ���������  ��  ��   �  � � � l  � ��� � ���   � ? 9 make folder if needed, or remove the existing assets dir    � � � � r   m a k e   f o l d e r   i f   n e e d e d ,   o r   r e m o v e   t h e   e x i s t i n g   a s s e t s   d i r �  � � � r   � � � � � c   � � � � � l  � � ����� � b   � � � � � b   � � � � � o   � ����� 0 
defaultdir 
defaultDir � o   � ����� 0 prezdir prezDir � o   � ����� 0 	assetsdir 	assetsDir��  ��   � m   � ���
�� 
TEXT � o      ���� 0 finaldir finalDir �  � � � Z   � � � ����� � l  � � ����� � I  � ��� ���
�� .coredoexnull���     obj  � l  � � ����� � 4   � �� �
� 
cfol � o   � ��~�~ 0 finaldir finalDir��  ��  ��  ��  ��   � k   � � � �  � � � I  � ��} ��|
�} .coredelonull���     obj  � l  � � ��{�z � n   � � � � � 2  � ��y
�y 
file � 4   � ��x �
�x 
ctnr � o   � ��w�w 0 finaldir finalDir�{  �z  �|   �  � � � I  � ��v ��u
�v .coredelonull���     obj  � l  � � ��t�s � n   � � � � � 2  � ��r
�r 
cfol � 4   � ��q �
�q 
ctnr � o   � ��p�p 0 finaldir finalDir�t  �s  �u   �  ��o � I  � ��n ��m
�n .coredelonull���     obj  � 4   � ��l �
�l 
ctnr � o   � ��k�k 0 finaldir finalDir�m  �o  ��  ��   �  � � � l  � ��j�i�h�j  �i  �h   �  � � � I  ��g � �
�g .coremovenull���     obj  � 4   � ��f �
�f 
cfol � o   � ��e�e 0 assetsfolder assetsFolder � �d ��c
�d 
insh � 4   ��b �
�b 
cfol � l  � ��a�` � c   � � � � l  � ��_�^ � b   � � � � o   � �]�] 0 
defaultdir 
defaultDir � o   �\�\ 0 prezdir prezDir�_  �^   � m  �[
�[ 
TEXT�a  �`  �c   �  ��Z � l  � � � � I �Y ��X
�Y .coredelonull���     obj  � 4  �W �
�W 
ctnr � l  ��V�U � c   � � � l  ��T�S � b   � � � b   � � � o  �R�R 0 
defaultdir 
defaultDir � o  �Q�Q 0 prezdir prezDir � o  �P�P 0 tempdir tempDir�T  �S   � m  �O
�O 
TEXT�V  �U  �X   �   finally, delete the tmp    � � � � 0   f i n a l l y ,   d e l e t e   t h e   t m p�Z   � m   � � � ��                                                                                  MACS  alis    @  Macintosh HD                   BD ����
Finder.app                                                     ����            ����  
 cu             CoreServices  )/:System:Library:CoreServices:Finder.app/    
 F i n d e r . a p p    M a c i n t o s h   H D  &System/Library/CoreServices/Finder.app  / ��  ��  ��   �  � � � l     �N�M�L�N  �M  �L   �  � � � l     �K � ��K   � I C (4) Wrap up with some optional shell scripting to open the browser    � � � � �   ( 4 )   W r a p   u p   w i t h   s o m e   o p t i o n a l   s h e l l   s c r i p t i n g   t o   o p e n   t h e   b r o w s e r �  � � � l F ��J�I � r  F � � � n  B   1  >B�H
�H 
bhit l >�G�F I >�E
�E .sysodlogaskr        TEXT m  ! � � P r o c e s s   c o m p l e t e !   W o u l d   y o u   l i k e   t o   o p e n   y o u r   p r e s e n t a t i o n   i n   t h e   b r o w s e r ? �D
�D 
btns J  $,		 

 m  $' �  O p e n �C m  '* �  C a n c e l�C   �B
�B 
dflt m  /2 �  O p e n �A�@
�A 
cbtn m  58 �  C a n c e l�@  �G  �F   � o      �?�? 0 request  �J  �I   � �> l G��=�< Z  G��;�: = GN o  GJ�9�9 0 request   m  JM �  O p e n k  Q�   !"! l QQ�8#$�8  # c ] https://stackoverflow.com/questions/24918497/applescript-run-bash-script-from-same-directory   $ �%% �   h t t p s : / / s t a c k o v e r f l o w . c o m / q u e s t i o n s / 2 4 9 1 8 4 9 7 / a p p l e s c r i p t - r u n - b a s h - s c r i p t - f r o m - s a m e - d i r e c t o r y" &'& r  Q^()( n  QZ*+* 1  VZ�7
�7 
strq+ n  QV,-, 1  RV�6
�6 
psxp- o  QR�5�5 0 
defaultdir 
defaultDir) o      �4�4 0 folder_path  ' .�3. O  _�/0/ k  e�11 232 I ej�2�1�0
�2 .miscactvnull��� ��� obj �1  �0  3 454 r  kz676 b  kv898 b  kr:;: m  kn<< �==  / b i n / b a s h  ; o  nq�/�/ 0 folder_path  9 m  ru>> �??  o p e n _ s l i d e s . s h7 o      �.�. 0 run_cmd  5 @�-@ I {��,A�+
�, .coredoscnull��� ��� ctxtA o  {~�*�* 0 run_cmd  �+  �-  0 m  _bBB�                                                                                      @ alis    J  Macintosh HD                   BD ����Terminal.app                                                   ����            ����  
 cu             	Utilities   -/:System:Applications:Utilities:Terminal.app/     T e r m i n a l . a p p    M a c i n t o s h   H D  *System/Applications/Utilities/Terminal.app  / ��  �3  �;  �:  �=  �<  �>       �)CD   %EFGHIJKLM�(�'�&�)  C �%�$�#�"�!� ����������
�% .aevtoappnull  �   � ****�$ 0 prezdir prezDir�# 0 tempdir tempDir�" 0 	assetsdir 	assetsDir�! 0 
defaultdir 
defaultDir�  (0 chosendocumentfile chosenDocumentFile� *0 targetfolderhfspath targetFolderHFSPath�  0 chosendocument chosenDocument� 0 assetsfolder assetsFolder� 0 finaldir finalDir� 0 request  � 0 folder_path  � 0 run_cmd  �  �  �  D �N��OP�
� .aevtoappnull  �   � ****N k    �QQ  RR  SS  TT   UU  .VV  _WW  �XX  �YY ��  �  �  O  P < � � � %� W���
�	��� I����� �� ���������������� ���������������������������������B<>����
� .sysodlogaskr        TEXT� 0 prezdir prezDir� 0 tempdir tempDir� 0 	assetsdir 	assetsDir
� .miscactvnull��� ��� obj 
� .earsffdralis        afdr
�
 
ctnr
�	 
alis� 0 
defaultdir 
defaultDir
� 
dflc
� 
prmp� 
� .sysostdfalis    ��� null� (0 chosendocumentfile chosenDocumentFile
� 
TEXT� *0 targetfolderhfspath targetFolderHFSPath
�  .aevtodocnull  �    alis��  0 chosendocument chosenDocument���
�� 
exft
�� KnefKhtm
�� 
kfil
�� 
file
�� .Knstexponull���     docu
�� .coreclosnull���     obj �� 0 assetsfolder assetsFolder�� 0 finaldir finalDir
�� 
cfol
�� .coredoexnull���     obj 
�� .coredelonull���     obj 
�� 
insh
�� .coremovenull���     obj 
�� 
btns
�� 
dflt
�� 
cbtn�� 
�� 
bhit�� 0 request  
�� 
psxp
�� 
strq�� 0 folder_path  �� 0 run_cmd  
�� .coredoscnull��� ��� ctxt���j O�E�O�E�O�E�O� 3*j 	O)j 
�,�&E�O*���a a  E` O��%�%a &E` UOa  ;*j 	O_ j E` Oa n_ a a a *a _ /a  oO_ j UO� ���%�%a &a  %�%a &E` !O��%�%a &E` "O*a #_ "/j $ -*�_ "/a -j %O*�_ "/a #-j %O*�_ "/j %Y hO*a #_ !/a &*a #��%a &/l 'O*���%�%a &/j %UOa (a )a *a +lva ,a -a .a /a 0 a 1,E` 2O_ 2a 3  7�a 4,a 5,E` 6Oa 7 *j 	Oa 8_ 6%a 9%E` :O_ :j ;UY hE�alis    �  Macintosh HD                   BD ����SmartSlides                                                    ����            ����  
 cu             final_project   J/:Users:gecanow:Desktop:mit_senior_spring:6-835:final_project:SmartSlides/    S m a r t S l i d e s    M a c i n t o s h   H D  GUsers/gecanow/Desktop/mit_senior_spring/6-835/final_project/SmartSlides   /    ��  F�alis    �   Macintosh HD                   BD ����6.835 User Research.pptx                                       ����            ����  J cu            b/:Users:gecanow:Desktop:mit_senior_spring:6-835:final_project:SmartSlides:6.835 User Research.pptx  2  6 . 8 3 5   U s e r   R e s e a r c h . p p t x    M a c i n t o s h   H D  `Users/gecanow/Desktop/mit_senior_spring/6-835/final_project/SmartSlides/6.835 User Research.pptx  /    ��  G �ZZ � M a c i n t o s h   H D : U s e r s : g e c a n o w : D e s k t o p : m i t _ s e n i o r _ s p r i n g : 6 - 8 3 5 : f i n a l _ p r o j e c t : S m a r t S l i d e s : p u b l i c : p r e s e n t a t i o n : a s s e t s _ t m pH [[  ���\��
�� 
docu\ �]] H 8 6 E 5 D 8 3 2 - 1 2 5 5 - 4 A 3 6 - 9 8 7 A - 3 D 3 5 C 7 0 B 5 5 2 6
�� kfrmID  I �^^ � M a c i n t o s h   H D : U s e r s : g e c a n o w : D e s k t o p : m i t _ s e n i o r _ s p r i n g : 6 - 8 3 5 : f i n a l _ p r o j e c t : S m a r t S l i d e s : p u b l i c : p r e s e n t a t i o n : a s s e t s _ t m p : a s s e t sJ �__ � M a c i n t o s h   H D : U s e r s : g e c a n o w : D e s k t o p : m i t _ s e n i o r _ s p r i n g : 6 - 8 3 5 : f i n a l _ p r o j e c t : S m a r t S l i d e s : p u b l i c : p r e s e n t a t i o n : a s s e t sK �``  O p e nL �aa � ' / U s e r s / g e c a n o w / D e s k t o p / m i t _ s e n i o r _ s p r i n g / 6 - 8 3 5 / f i n a l _ p r o j e c t / S m a r t S l i d e s / 'M �bb � / b i n / b a s h   ' / U s e r s / g e c a n o w / D e s k t o p / m i t _ s e n i o r _ s p r i n g / 6 - 8 3 5 / f i n a l _ p r o j e c t / S m a r t S l i d e s / ' o p e n _ s l i d e s . s h�(  �'  �&   ascr  ��ޭ