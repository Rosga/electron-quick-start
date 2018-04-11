{
  'targets': [{
    'target_name': 'electron-quick-start',
    'include_dirs': [
        "<!(node -e \"require('nan')\")"
    ],
    
    'cflags': [
      '-Wall',
      '-Wparentheses',
      '-Winline',
      '-Wbad-function-cast',
      '-Wdisabled-optimization',
      '-fexceptions'
    ],
    'cflags_cc': ['-fexceptions'],
    'cflags!': [ '-fno-exceptions' ],
    'cflags_cc!': [ '-fno-exceptions' ],
    
    'conditions': [
      ['OS == "mac"', {
        'xcode_settings': {
            'GCC_ENABLE_CPP_EXCEPTIONS': 'YES'
          },
        'include_dirs': [
          'System/Library/Frameworks/CoreFoundation.Framework/Headers',
          'System/Library/Frameworks/Foundation.framework/Headers',
          'System/Library/Frameworks/Carbon.Framework/Headers',
          'System/Library/Frameworks/ApplicationServices.framework/Headers',
          'System/Library/Frameworks/IOKit.framework/Headers',
          'System/Library/Frameworks/Cocoa.framework/Headers',
          'System/Library/Frameworks/OpenGL.framework/Headers'
        ],
        "sources": [
          "app/native/darwin/system_properties.c",
          "app/native/darwin/input_helper.c",
          "app/native/darwin/input_hook.c"
        ],
        'link_settings': {
          'libraries': [
            '-framework Carbon',
            '-framework CoreFoundation',
            '-framework ApplicationServices',
            '-framework Cocoa',
            '-framework Foundation',
            '-framework OpenGL',
            '-framework IOKit'
          ]
        },
      }],
      
      ['OS == "linux"', {
        'link_settings': {
          'libraries': [
            '-lpng',
            '-lz',
            '-lX11',
            '-lXtst'
          ]
        },
        "sources": [
          "app/native/linux/system_properties.c",
          "app/native/linux/input_helper.c",
          "app/native/linux/input_hook.c"
        ],
      }],

      ["OS=='win'", {
        'defines': ['IS_WINDOWS'],
        'link_settings': {
          'libraries': [
            'Oleacc',
            "UIAutomationCore",
            
            "comsuppw"
          ]
        },
        "sources": [
          "app/native/windows/system_properties.c",
          "app/native/windows/input_helper.c",
          "app/native/windows/input_hook.c"
        ],
      }]
    ],

    'sources': [
        "app/native/quick-start.cc",
        "app/native/logger.c"
    ]
  }]
}