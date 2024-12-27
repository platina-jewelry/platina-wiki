import React, { useEffect, useState } from 'react';
import { Button, Box } from '@chakra-ui/react';

const Article: React.FC = () => {
  // isEditing и articleContent имеют явные типы
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [articleContent, setArticleContent] = useState<string>('Это первоначальная версия статьи.');

  // Для EditorComponent нужно указать, что это компонент, который может принимать пропсы, например, initialContent и onSave
  const [EditorComponent, setEditorComponent] = useState<React.ComponentType<{ initialContent: string; onSave: (content: string) => void }> | null>(null);

  const [isEditorReady, setIsEditorReady] = useState<boolean>(false);

  useEffect(() => {
    const fetchArticle = () => {
      const fakeArticle = { id: 1, content: 'Это первоначальная версия статьи.' };
      setArticleContent(fakeArticle.content);
    };

    fetchArticle();

    if (typeof window !== 'undefined') {
      import('./Editor').then((module) => {
        setEditorComponent(() => module.default);
        setIsEditorReady(true);
      });
    }
  }, []);

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const saveArticle = (content: string) => {
    setArticleContent(content);
    setIsEditing(false);
  };

  return (
    <Box>
      {!isEditing ? (
        <div>
          <p>{articleContent}</p>
          <Button onClick={toggleEditMode}>Редактировать</Button>
        </div>
      ) : (
        isEditorReady && EditorComponent ? (
          <EditorComponent initialContent={articleContent} onSave={saveArticle} />
        ) : (
          <div>Загрузка редактора...</div>
        )
      )}
    </Box>
  );
};

export default Article;
