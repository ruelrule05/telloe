<?php
namespace App\Http\Controllers\Admin;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AreasOfInterest;
use File;
use ImageOptimizer;

class AreasOfInterestController extends Controller
{
    public function index(Request $request)
    {
        $areasOfInterests = AreasOfInterest::orderBy('created_at', 'DESC')->get();
        return response()->json($areasOfInterests);
    }

    public function store(Request $request)
    {
        $this->validate($request, [
            'area' => 'required'
        ]);

        $exists = AreasOfInterest::where('area', $request->area)->first();
        if ($exists) return abort(403, 'Name already exists');

        $i = 1;
        $time = time();
        $sampleImages = [];
        foreach ($request->sample_images as $sample) :
            if (is_base64_encoded($sample)) :
                // Source
                $source = $sample;
                $mime = substr($source, 5, strpos($source, ';')-5);
                $extension = explode('/', $mime)[1];
                $filename = $time . '-sample-' . $i;
                $sampleDestination = 'storage/sample-images/' . $filename . '.' . $extension;
                $sample = base64_decode(substr($source, strpos($source, ',') + 1));
                File::put($sampleDestination, $sample);

                if (File::exists($sampleDestination)) :
                    ImageOptimizer::optimize($sampleDestination);
                    $sampleImages[] = '/' . $sampleDestination;
                endif;
            endif;
            $i++;
        endforeach;

        $areaOfInterest = AreasOfInterest::create([
            'area' => $request->area,
            'sample_images' => $sampleImages
        ]);

        return response()->json($areaOfInterest);
    }

    public function update($id, Request $request) {
        $this->validate($request, [
            'area' => 'required'
        ]);

        $areaOfInterest = AreasOfInterest::findOrFail($id);
        $exists = AreasOfInterest::where('area', $request->area)->where('id', '<>', $areaOfInterest->id)->first();
        if ($exists) return abort(403, 'Name already exists');

        $i = 1;
        $time = time();
        $sampleImages = [];
        foreach ($request->sample_images as $sample) :
            if (is_base64_encoded($sample)) :
                // Source
                $source = $sample;
                $mime = substr($source, 5, strpos($source, ';')-5);
                $extension = explode('/', $mime)[1];
                $filename = $time . '-sample-' . $i;
                $sampleDestination = 'storage/sample-images/' . $filename . '.' . $extension;
                $sample = base64_decode(substr($source, strpos($source, ',') + 1));
                File::put($sampleDestination, $sample);

                if (File::exists($sampleDestination)) :
                    ImageOptimizer::optimize($sampleDestination);
                    $sampleImages[] = '/' . $sampleDestination;
                endif;
            elseif (File::exists(ltrim($sample, '/'))) :
                $sampleImages[] = $sample;
            endif;
            $i++;
        endforeach;

        $areaOfInterest->update([
            'area' => $request->area,
            'sample_images' => $sampleImages
        ]);

        return response()->json($areaOfInterest);
    }


    public function destroy($id) 
    {
        $delete = AreasOfInterest::where('id', $id)->delete();
        return response()->json($delete);
    }
}
