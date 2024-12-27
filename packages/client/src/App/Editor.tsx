import React, { useEffect, useState } from 'react';

const Editor: React.FC = () => {
  const [EditorJS, setEditorJS] = useState<any>(null);

  useEffect(() => {
    // Загружаем Editor.js и инструменты только на клиенте
    if (typeof window !== 'undefined') {
      import('@editorjs/editorjs').then((EditorModule) => {
        import('@editorjs/header').then((Header) => {
          import('@editorjs/list').then((List) => {
            import('@editorjs/simple-image').then((Image) => {
              import('@editorjs/quote').then((Quote) => {
                import('@editorjs/code').then((Code) => {
                  import('@editorjs/link').then((LinkTool) => {
                    import('@editorjs/delimiter').then((Delimiter) => {
                      import('@editorjs/table').then((Table) => {
                        import('@editorjs/marker').then((Marker) => {
                          import('@editorjs/checklist').then((Checklist) => {
                            import('@editorjs/warning').then((Warning) => {
                              import('@editorjs/inline-code').then((InlineCode) => {
                                import('@editorjs/raw').then((Raw) => {
                                  import('@editorjs/embed').then((Embed) => {
                                    // Инициализируем редактор после загрузки всех инструментов
                                    const editor = new EditorModule.default({
                                      holder: 'editorjs', // ID контейнера для Editor.js
                                      tools: {
                                        header: {
                                          class: Header.default,
                                          inlineToolbar: true,
                                          config: {
                                            placeholder: 'Заголовок',
                                          },
                                        },
                                        list: {
                                          class: List.default,
                                          inlineToolbar: true,
                                          config: {
                                            defaultStyle: 'unordered',
                                          },
                                        },
                                        image: {
                                          class: Image.default,
                                          config: {
                                            uploader: {
                                              uploadByFile(file: File) {
                                                return new Promise((resolve) => {
                                                  const url = URL.createObjectURL(file);
                                                  resolve({
                                                    success: 1,
                                                    file: {
                                                      url,
                                                    },
                                                  });
                                                });
                                              },
                                            },
                                          },
                                        },
                                        quote: {
                                          class: Quote.default,
                                          inlineToolbar: true,
                                          config: {
                                            placeholder: 'Введите цитату',
                                            captionPlaceholder: 'Автор цитаты',
                                          },
                                        },
                                        code: {
                                          class: Code.default,
                                          inlineToolbar: true,
                                          config: {
                                            placeholder: 'Введите код...',
                                          },
                                        },
                                        link: {
                                          class: LinkTool.default,
                                          config: {
                                            placeholder: 'Вставьте ссылку',
                                          },
                                        },
                                        delimiter: {
                                          class: Delimiter.default,
                                        },
                                        table: {
                                          class: Table.default,
                                          inlineToolbar: true,
                                          config: {
                                            rows: 3,
                                            columns: 3,
                                          },
                                        },
                                        marker: {
                                          class: Marker.default,
                                          shortcut: 'CMD+SHIFT+M',
                                        },
                                        checklist: {
                                          class: Checklist.default,
                                          inlineToolbar: true,
                                          config: {
                                            placeholder: 'Задача...',
                                          },
                                        },
                                        warning: {
                                          class: Warning.default,
                                          config: {
                                            titlePlaceholder: 'Название предупреждения',
                                            messagePlaceholder: 'Текст предупреждения',
                                          },
                                        },
                                        inlineCode: {
                                          class: InlineCode.default,
                                        },
                                        raw: {
                                          class: Raw.default,
                                          config: {
                                            placeholder: 'Введите HTML',
                                          },
                                        },
                                        embed: {
                                          class: Embed.default,
                                          config: {
                                            services: {
                                              youtube: true,
                                              vimeo: true,
                                              twitter: true,
                                            },
                                          },
                                        },
                                      },
                                    });

                                    setEditorJS(editor); // Сохраняем ссылку на редактор в состоянии
                                  }).catch((err) => console.error('Error loading Embed Tool:', err));
                                }).catch((err) => console.error('Error loading Raw Tool:', err));
                              }).catch((err) => console.error('Error loading InlineCode Tool:', err));
                            }).catch((err) => console.error('Error loading Warning Tool:', err));
                          }).catch((err) => console.error('Error loading Checklist Tool:', err));
                        }).catch((err) => console.error('Error loading Marker Tool:', err));
                      }).catch((err) => console.error('Error loading Table Tool:', err));
                    }).catch((err) => console.error('Error loading Delimiter Tool:', err));
                  }).catch((err) => console.error('Error loading Embed Tool:', err));
                }).catch((err) => console.error('Error loading Link Tool:', err));
              }).catch((err) => console.error('Error loading Code Tool:', err));
            }).catch((err) => console.error('Error loading Quote Tool:', err));
          }).catch((err) => console.error('Error loading Image Tool:', err));
        }).catch((err) => console.error('Error loading Header Tool:', err));
      }).catch((err) => {
        console.error('Error loading Editor.js:', err);
      });
    }
  }, []); // Только один useEffect для загрузки редактора и инструментов

  useEffect(() => {
    if (EditorJS) {
      return () => {
        EditorJS.destroy(); // Очистка редактора при размонтировании компонента
      };
    }
  }, [EditorJS]);

  return <div id="editorjs"></div>;
};

export default Editor;
